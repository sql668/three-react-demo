import { Key, useEffect, useRef } from "react";
import {
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons";
import { GUI } from "dat.gui";
import { mesh } from "./model";


export default function Middle03() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = ref.current?.clientWidth!;
    const height = ref.current?.clientHeight!;

    const gui = new GUI({ autoPlace: false });
    const data: Record<string | number, any> = {
      x: 30,
      rotate: true,
    };

    const guiChange = () => {
      render.render(scene, camera);
    };

    // 创建场景
    const scene = new Scene();

    scene.add(mesh);

    // 坐标轴
    const axesHelper = new AxesHelper(150);
    scene.add(axesHelper);

    // 创建光源
    const ambientLight = new AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // 第二步： 创建相机
    const camera = new PerspectiveCamera(50, width / height, 0.1, 3000);
    camera.position.set(300, 300, 300);
    camera.lookAt(0, 0, 0); // 相机对准的物体会在画布的中心位置

    // 第三步： 渲染器
    const render = new WebGLRenderer({
      antialias: true, // 开启抗锯齿
    });
    render.setPixelRatio(window.devicePixelRatio); // 设置像素比
    render.setClearColor(0x444444, 1); // 设置背景颜色
    render.setSize(width, height);
    //render.render(scene, camera);

    ref.current?.appendChild(render.domElement);

    // 相机控件
    const control = new OrbitControls(camera, render.domElement);
    let animateId: number;
    function animate() {
      render.render(scene, camera); // 更新canvas画布
      animateId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animateId);
      ref.current?.removeChild(render.domElement);
      scene.remove(mesh);
      ambientLight.dispose();
      control.dispose();
      //control.dispose()
    };
  }, []);
  return (
    <>
      <div
        style={{ height: "600px", width: "800px", position: "relative" }}
        ref={ref}
      ></div>
    </>
  );
}
