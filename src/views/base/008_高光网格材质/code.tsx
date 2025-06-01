import { useCallback, useEffect, useRef, useState } from "react";
import {
  AmbientLight,
  AxesHelper,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons";
import { useSizeEvt } from "@/hooks";
import { useThrottleFn } from "ahooks";
import Stats from "stats.js";

import { createStyles } from "antd-style";

const useStyles = createStyles(({ token, css }) => ({
  // 支持 css object 的写法
  container: {
    position: "relative",
    height: '400px',
    width: '50%'
  },
  // 也支持通过 css 字符串模板获得和 普通 css 一致的书写体验
  card: css`
    color: ${token.colorTextTertiary};
    box-shadow: ${token.boxShadow};
    &:hover {
      color: ${token.colorTextSecondary};
      box-shadow: ${token.boxShadowSecondary};
    }

    padding: ${token.padding}px;
    border-radius: ${token.borderRadius}px;
    background: ${token.colorBgContainer};
    transition: all 100ms ${token.motionEaseInBack};

    margin-bottom: 8px;
    cursor: pointer;
  `,
}));



export default function Demo() {
  // styles 对象在 useStyles 方法中默认会被缓存，所以不用担心 re-render 问题
  const { styles, cx, theme } = useStyles();

  const ref = useRef<HTMLDivElement>(null);

  const [scene, setScene] = useState<Object3D>();
  const [mesh, setMesh] = useState<Object3D>();

  const [camera, setCamera] = useState<PerspectiveCamera>();

  const [control, setControl] = useState<OrbitControls>();

  const [render, setRender] = useState<WebGLRenderer>();

  const [animateId, setAnimateId] = useState<number>();

  const [stats, setStats] = useState<Stats>();

  const sizeChange = useCallback(
    (size: { width: number; height: number }) => {
      if (render && camera) {
        render.setSize(size.width, size.height);
        camera.aspect = size.width / size.height;
        camera.updateProjectionMatrix();
      }
    },
    [render, camera]
  );

  const { run: throttledSize } = useThrottleFn(sizeChange, { wait: 100 });

  useSizeEvt(ref, throttledSize);

  useEffect(() => {
    console.log(render, camera);
  }, [render, camera]);

  const initThree = () => {
    console.log("initThree...");
    const width = ref.current?.clientWidth!;
    const height = ref.current?.clientHeight!;
    // 第一步： 创建场景
    const scene = new Scene();
    setScene(scene);

    // 球体
    const sphereGeometry = new SphereGeometry(100);
    const material = new MeshPhongMaterial({
      color: 0xff0000,
      shininess: 100, // 高光部分亮度
      specular: 0x444444,// 高光部分的颜色
    });
    const mesh = new Mesh(sphereGeometry, material);
    setMesh(mesh);

    // 设置网络模型在三维空间中的位置,默认是坐标原点
    //mesh.position.set(0,10,10)
    // 将物体添加到场景中
    scene.add(mesh);

    // 创建一个三维坐标轴
    const axesHelper = new AxesHelper(150);
    scene.add(axesHelper);

    const ambientLight = new AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const directionLight = new DirectionalLight(0xffffff, 2.0);
    directionLight.position.set(200, 200, 200);
    directionLight.target = mesh;
    scene.add(directionLight);


    // 第二步： 创建相机
    // 透视投影相机
    const camera = new PerspectiveCamera(50, width / height, 0.1, 3000);
    setCamera(camera);
    camera.position.set(200, 200, 200);
    // 相机的朝向
    camera.lookAt(mesh.position);

    // 第三步： 渲染器
    const render = new WebGLRenderer();
    setRender(render);
    render.setSize(width, height);
    render.render(scene, camera);

    ref.current?.appendChild(render.domElement);

    const stats = new Stats();
    setStats(stats);
    stats.dom.style.position = "absolute";
    ref.current?.appendChild(stats.dom);
    console.log("mesh.position: ", mesh);
    // 相机控件
    const control = new OrbitControls(camera, render.domElement);
    // 这里要和 camera.lookAt 目标点相同,control 默认指向（0，0，0）如果相机的lookAT不是坐标原点，这里要手动改成一致的
    control.target.set(mesh.position.x, mesh.position.y, mesh.position.z);
    control.update()
    setControl(control);
  };

  const animate = () => {
    stats?.update();
    render!.render(scene!, camera!); // 更新canvas画布
    const animateId = requestAnimationFrame(animate);
    setAnimateId(animateId);
  };

  useEffect(() => {
    initThree();
  }, []);

  useEffect(() => {
    if (mesh && render) {
      animate();
    }

    return () => {
      // 页面销毁时清理垃圾
      cancelAnimationFrame(animateId!);
      if (render) {
        ref.current?.removeChild(render.domElement);
      }

      if (scene && mesh) {
        scene!.remove(mesh!);
        scene?.clear();
      }
    };
  }, [mesh, render]);


  return (
    <div
      className={cx("a-simple-create-style-demo-classname", styles.container)}
      ref={ref}
    ></div>
  );
}
