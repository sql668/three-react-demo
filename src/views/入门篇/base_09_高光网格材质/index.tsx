import { useEffect, useRef } from "react";
import { AmbientLight, AxesHelper, CylinderGeometry, DirectionalLight, DoubleSide, Mesh, MeshLambertMaterial, MeshPhongMaterial, PerspectiveCamera, PointLight, Scene, SphereGeometry, WebGLRenderer } from "three";
import { OrbitControls } from "three/addons";

export default function Base09() { 
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const width = ref.current?.clientWidth!;
    const height = ref.current?.clientHeight!;

    // 创建场景
    const scene = new Scene();
    // 球体
    const sphereGeometry = new SphereGeometry(100);
    const material = new MeshPhongMaterial({
      color: 0xff0000,
      shininess: 100, // 高光部分亮度
      specular:0x444444,// 高光部分的颜色
    });
    const mesh = new Mesh(sphereGeometry, material);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);

    // 坐标轴
    const axesHelper = new AxesHelper(150);
    scene.add(axesHelper);

    // 创建光源
    // const light = new PointLight(0xffffff, 1.0);
    // light.decay = 0.0;
    // light.position.set(150, 150, 150);
    // scene.add(light);
    const ambientLight = new AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const directionLight = new DirectionalLight(0xffffff, 2.0);
    directionLight.position.set(200, 200, 200);
    directionLight.target = mesh; 
    scene.add(directionLight);

    // 第二步： 创建相机
    const camera = new PerspectiveCamera(50, width / height, 0.1, 3000);
    camera.position.set(300, 300, 300);
    camera.lookAt(mesh.position); // 相机对准的物体会在画布的中心位置

    // 第三步： 渲染器
    const render = new WebGLRenderer();
    render.setSize(width, height);
    render.render(scene, camera);

    ref.current?.appendChild(render.domElement);

    // 相机控件
    const control = new OrbitControls(camera, render.domElement);
    // 和相机lookAt保持一致
    //control.target.set(600, 0, 600);
    //control.update();
    // 如果使用了循环渲染动画，这里就不用添加事件了
    control.addEventListener("change", () => {
      render.render(scene, camera);
    });
  },[])
  return (
    <>
      <div
        style={{ height: "600px", width: "800px", position: "relative" }}
        ref={ref}
      ></div>
    </>
  );
}