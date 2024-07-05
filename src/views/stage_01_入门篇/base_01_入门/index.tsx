import { useEffect, useRef } from "react"
import { AxesHelper, BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three"

export default function Base01() { 

  const ref = useRef<HTMLDivElement>(null)

  const initThree = () => {
    const width = ref.current?.clientWidth!
    const height = ref.current?.clientHeight!
    // 第一步： 创建场景
    const scene = new Scene()
    // 创建物体
    const geometry = new BoxGeometry(100, 100, 100)
    // 材质
    const material = new MeshBasicMaterial({
      color: 0xff0000,  // 红色
      transparent: true, // 开启透明度
      opacity:0.5 // 设置透明度
    })
    // 创建网格模型,表示真是的物体
    const mesh = new Mesh(geometry, material);
    // 设置网络模型在三维空间中的位置,默认是坐标原点
    //mesh.position.set(0,10,10)
    // 将物体添加到场景中
    scene.add(mesh)


    // 创建一个三维坐标轴
    const axesHelper = new AxesHelper(150)
    scene.add(axesHelper)

    // 第二步： 创建相机
    // 透视投影相机
    const camera = new PerspectiveCamera(50,width/height,0.1,3000)
    camera.position.set(200, 200, 200)
    // 相机的朝向
    camera.lookAt(mesh.position);

    // 第三步： 渲染器
    const render = new WebGLRenderer()
    render.setSize(width, height)
    render.render(scene, camera)
    
    ref.current?.appendChild(render.domElement)
  }

  useEffect(() => {
    initThree()
    
  },[])
  return <div style={{ height: '600px', width: '800px' }} ref={ ref}></div>
}