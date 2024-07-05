import { BoxGeometry, DoubleSide, Mesh, MeshLambertMaterial, PlaneGeometry, SphereGeometry } from "three";


const geometry = new PlaneGeometry(100, 50);
setTimeout(() => {
  //geometry.scale(2, 2, 2);
  //geometry.translate(50, 0, 0)
  //geometry.center()// 居中
  //geometry.rotateX(Math.PI / 4)// 绕x轴旋转45度
}, 3000);
//const geometry = new BoxGeometry(50,50,50); //长方体
//const geometry = new SphereGeometry(50, 32, 16);// 分的越细越接近圆
console.log("几何体", geometry);
console.log("顶点位置数据", geometry.attributes.position);
console.log("顶点索引数据", geometry.index);

// 网格材质
const material = new MeshLambertMaterial({
  color: 0x00ffff,
  side: DoubleSide, // FrontSide 正面可见(默认)  DoubleSide双面可见  BackSide反面可见
  //wireframe: true
});

const mesh = new Mesh(geometry, material);

export default mesh;