import { Button } from "antd";
import { useEffect, useRef, useState } from "react";
import {
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons";

import Stats from "stats.js";

export default function Base07(){ 
  const [num, setNum] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = ref.current?.clientWidth!;
    const height = ref.current?.clientHeight!;
    // 创建场景
    const scene = new Scene();
    // 网络模型对象
    const geometry = new BoxGeometry(60, 60, 60);
    // 材质  MeshLambertMaterial 漫反射材质 受光源影响
    const material = new MeshLambertMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5,
    });

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const mesh = new Mesh(geometry, material);
        mesh.position.set(i * 120, 0, j * 120);
        scene.add(mesh);
      }
    }

    // 创建一个三维坐标轴
    const axesHelper = new AxesHelper(100);
    scene.add(axesHelper);

    // 创建光源
    const light = new PointLight(0xffffff, 1.0);
    light.decay = 0.0;
    light.position.set(400, 200, 300);
    scene.add(light);
    const ambientLight = new AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // 第二步： 创建相机
    const camera = new PerspectiveCamera(50, width / height, 0.1, 6000);
    camera.position.set(1200, 1200, 1200);
    camera.lookAt(600, 0, 600); // 相机对准的物体会在画布的中心位置

    // 第三步： 渲染器
    const render = new WebGLRenderer();
    render.setSize(width, height);
    //render.render(scene, camera);

    ref.current?.appendChild(render.domElement);

    const stats = new Stats();
    stats.dom.style.position = "absolute";
    ref.current?.appendChild(stats.dom);
    // 相机控件
    const control = new OrbitControls(camera, render.domElement);
    // 和相机lookAt保持一致
    control.target.set(600, 0, 600);
    control.update();
    // 如果使用了循环渲染动画，这里就不用添加事件了
    control.addEventListener("change", () => {
      render.render(scene, camera);
    });
    render.render(scene, camera); // 更新canvas画布
    let animateId: number;
    // function animate() {
    //   stats.update();
    //   mesh.rotateY(0.01);
    //   render.render(scene, camera); // 更新canvas画布
    //   animateId = requestAnimationFrame(animate);
    // }
    // animate();

    return () => {
      // 页面销毁时清理垃圾
      // cancelAnimationFrame(animateId);
      // ref.current?.removeChild(render.domElement);
      // scene.remove(mesh);
      // geometry.dispose();
      // material.dispose();
      // ambientLight.dispose();
      // directionLight.dispose();
      //control.dispose()
    };
  }, []);
  return (
    <>
      <Button onClick={() => setNum((pre) => pre + 1)}>点我+1</Button>
      {num}
      <div style={{ height: "600px", width: "800px",position:"relative" }} ref={ref}></div>
    </>
  );
}