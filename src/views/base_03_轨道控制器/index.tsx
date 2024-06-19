import { useEffect, useRef } from "react";
import {
  AxesHelper,
  BoxGeometry,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera,
  PointLight,
  PointLightHelper,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons";

export default function Base03() {
  const ref = useRef<HTMLDivElement>(null);

  const initThree = () => {
    const width = ref.current?.clientWidth!;
    const height = ref.current?.clientHeight!;
    // 第一步： 创建场景
    const scene = new Scene();
    // 创建物体
    const geometry = new BoxGeometry(60, 60, 60);
    // 材质  MeshLambertMaterial 漫反射材质 受光源影响
    const material = new MeshLambertMaterial({
      color: 0x00ffff,
      //transparent: true, // 开启透明度
      //opacity: 0.5, // 设置透明度
    });
    // 创建网格模型,表示真是的物体
    const mesh = new Mesh(geometry, material);
    // 设置网络模型在三维空间中的位置,默认是坐标原点
    //mesh.position.set(0,10,10)
    // 将物体添加到场景中
    scene.add(mesh);

    // 创建一个三维坐标轴
    const axesHelper = new AxesHelper(150);
    scene.add(axesHelper);

    // 创建光源  点光源(类似白炽灯)  参数: 光源颜色，光照强度
    const light = new PointLight(0xffffff, 1.0);
    // 衰减(距离光源越远，光照强度越微弱) 默认为2.0  如果想关闭衰减属性可以设置为0.0
    light.decay = 0.0;
    // 光源在x轴上
    light.position.set(120, 100, 100);

    scene.add(light);

    // 可视化点光源
    const plh = new PointLightHelper(light, 2);
    scene.add(plh)

    // 第二步： 创建相机
    // 透视投影相机
    const camera = new PerspectiveCamera(50, width / height, 0.1, 3000);
    camera.position.set(200, 200, 200);
    // 相机的朝向
    camera.lookAt(mesh.position);

    // 第三步： 渲染器
    const render = new WebGLRenderer();
    render.setSize(width, height);
    render.render(scene, camera);

    ref.current?.appendChild(render.domElement);

    // 相机控件
    const control = new OrbitControls(camera, render.domElement);
    control.addEventListener("change", () => {
      console.log("相机change");
      render.render(scene, camera);
    });
  };

  useEffect(() => {
    initThree();
  }, []);
  return <div style={{ height: "600px", width: "800px" }} ref={ref}></div>;
}
