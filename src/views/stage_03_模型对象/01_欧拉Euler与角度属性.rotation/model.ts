import { log } from "console";
import {
  BoxGeometry,
  DoubleSide,
  Euler,
  Mesh,
  MeshLambertMaterial,
  PlaneGeometry,
  SphereGeometry,
} from "three";


const geometry = new BoxGeometry(50,50,50); //长方体


// 网格材质
const material = new MeshLambertMaterial({
  color: 0x00ffff,
  side: DoubleSide, // FrontSide 正面可见(默认)  DoubleSide双面可见  BackSide反面可见
  //wireframe: true
});

const mesh = new Mesh(geometry, material);

//const eu = new Euler(0,Math.PI,0)
console.log(mesh.rotation);
mesh.rotation.y = Math.PI / 4   // 绕y轴旋转45度
mesh.rotateY(Math.PI / 4)

export default mesh;
