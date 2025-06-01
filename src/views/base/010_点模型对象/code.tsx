import { useEffect, useRef, useState } from "react";
import {
  AmbientLight,
  AxesHelper,
  BufferAttribute,
  BufferGeometry,
  Object3D,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons";
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


// 空的几何体对象，只定义各个定点的位置信息
const geometry = new BufferGeometry()

// 顶点原始数据
const vertices = new Float32Array([
  0, 0, 0, //  顶点1的坐标
  50, 0, 0, // 顶点2的坐标
  0, 100, 0, // 顶点3的坐标
  0, 0, 10, // 顶点4的坐标
  0, 0, 100, // 顶点5的坐标
  50,0,10, // 顶点6的坐标
])

// BufferAttribute 属性缓冲区对象，3个为一组表示一个顶点
const attribute = new BufferAttribute(vertices, 3)

//设置几何体顶点位置属性
geometry.attributes.position = attribute

// 点模型也有自己的材质
const material = new PointsMaterial({
  color: 0xffff00,
  size: 10,
})

// 定义点模型对象
const points = new Points(geometry,material)


export default function Demo() {
  // styles 对象在 useStyles 方法中默认会被缓存，所以不用担心 re-render 问题
  const { styles, cx, theme } = useStyles();

  const ref = useRef<HTMLDivElement>(null);

  const [scene, setScene] = useState<Object3D>();

  const [camera, setCamera] = useState<PerspectiveCamera>();

  const [_, setControl] = useState<OrbitControls>();

  const [render, setRender] = useState<WebGLRenderer>();

  const [animateId, setAnimateId] = useState<number>();


  const initThree = () => {
    const width = 600;
    const height = 400;

    // 第一步： 创建场景
    const scene = new Scene();
    setScene(scene);
    // 将点模型加入到场景
    scene.add(points);

    // 辅助观察坐标系
    const axesHelper = new AxesHelper(150);
    scene.add(axesHelper);

    // 光源设置
    const pointLight = new PointLight(0xffffff, 1.0);
    pointLight.position.set(400, 200, 300);
    scene.add(pointLight);
    const ambient = new AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    // 相机
    const camera = new PerspectiveCamera(50, width / height, 0.1, 3000);
    setCamera(camera);
    camera.position.set(200, 200, 200);
    // 相机的朝向
    camera.lookAt(0, 0, 0);

    // 渲染器
    const render = new WebGLRenderer();
    setRender(render);
    render.setSize(width, height);
    render.render(scene, camera);
    ref.current?.appendChild(render.domElement);

    // 相机控件
    const control = new OrbitControls(camera, render.domElement);
    // 这里要和 camera.lookAt 目标点相同,control 默认指向（0，0，0）如果相机的lookAT不是坐标原点，这里要手动改成一致的
    control.target.set(0,0,0);
    control.update();
    setControl(control);
  };




  const animate = () => {
    if (render && scene && camera) {
      render!.render(scene!, camera!);
    }
    const animateId = requestAnimationFrame(animate);
    setAnimateId(animateId);
  };

  useEffect(() => {
    initThree();
  }, []);

  useEffect(() => {
    if (render) {
      animate();
    }

    return () => {
      // 页面销毁时清理垃圾
      cancelAnimationFrame(animateId!);
      if (render) {
        ref.current?.removeChild(render.domElement);
      }

      if (scene) {
        scene?.clear();
      }
    };
  }, [render]);

  return (
    <div
      className={cx("a-simple-create-style-demo-classname", styles.container)}
      ref={ref}
    ></div>
  );
}
