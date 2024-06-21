
import { Key, useEffect, useRef } from "react";
import { AmbientLight, AxesHelper, BoxGeometry, CylinderGeometry, DirectionalLight, DoubleSide, Mesh, MeshLambertMaterial, MeshPhongMaterial, PerspectiveCamera, PointLight, Scene, SphereGeometry, WebGLRenderer } from "three";
import { OrbitControls } from "three/addons";
import { GUI } from "dat.gui";

export default function Base11() { 
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = ref.current?.clientWidth!;
    const height = ref.current?.clientHeight!;

    const gui = new GUI({ autoPlace: false });
    const data:Record<string|number,any> = {
      x: 30,
      rotate: true
    };

    const guiChange = () => { 
      render.render(scene,camera)
    }

    // 创建场景
    const scene = new Scene();
    // 球体
    const boxGeometry = new BoxGeometry(100,100,100);
    const material = new MeshPhongMaterial({
      color: 0x00ffff,
      shininess: 100, // 高光部分亮度
      specular:0x444444,// 高光部分的颜色
    });
    const mesh = new Mesh(boxGeometry, material);
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
    const directionLight = new DirectionalLight(0xffffff, 1.0);
    directionLight.position.set(200, 300, 100);
    directionLight.target = mesh; 
    scene.add(directionLight);
    

    // 第二步： 创建相机
    const camera = new PerspectiveCamera(50, width / height, 0.1, 3000);
    camera.position.set(300, 300, 300);
    camera.lookAt(mesh.position); // 相机对准的物体会在画布的中心位置

    // 第三步： 渲染器
    const render = new WebGLRenderer({
      antialias: true // 开启抗锯齿
    });
    render.setPixelRatio(window.devicePixelRatio) // 设置像素比
    render.setClearColor(0x444444,1)// 设置背景颜色
    render.setSize(width, height);
    //render.render(scene, camera);

    ref.current?.appendChild(render.domElement);

    // 相机控件
    const control = new OrbitControls(camera, render.domElement);
    // 如果使用了循环渲染动画，这里就不用添加事件了
    // control.addEventListener("change", () => {
    //   render.render(scene, camera);
    // });

    let animateId: number;
    function animate() {
      if (data.rotate) {
         mesh.rotateY(0.01);
      }
     
      render.render(scene, camera); // 更新canvas画布
      animateId = requestAnimationFrame(animate);
    }
    animate();
    
    // 控制那个对象的哪个属性，最小值，最大值
    gui.domElement.style.position = "absolute";
    gui.domElement.style.top = "0px";
    gui.domElement.style.right = "0px";
    ref.current?.appendChild(gui.domElement);

    const lf = gui.addFolder("光源")
    const af = lf.addFolder("环境光")
    af
      .add(ambientLight, "intensity", 0.0, 10.0)
      .name("光照强度")
      //.onChange(guiChange); // 如果没有开启循环渲染动画，需要添加onChange 重新render.render
    const dfloder = lf.addFolder("平行光")
    dfloder.add(directionLight, "intensity", 0.0, 10.0).name("平行光照强度");
    const mfloder = gui.addFolder("网格")
    mfloder.add(mesh.position, "x", 0, 600).name("X轴").step(10);
    mfloder.add(mesh.position, "y", [-100, 0, 100]).name("y轴");
    data.color = material.color.getHex(),
    gui.addColor(data, "color").onChange(value => { 
      if (typeof value === "string") {
        value = value.replace("#", "0x");
      }
      material.color.setHex(value);
    });

    gui.add(data,'rotate').name("旋转")
    
    return () => {  
      cancelAnimationFrame(animateId);
      ref.current?.removeChild(render.domElement);
      scene.remove(mesh);
      boxGeometry.dispose();
      material.dispose();
      ambientLight.dispose();
      directionLight.dispose();
      control.dispose()
      //control.dispose()
    };
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