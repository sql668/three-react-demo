import {
  BackSide,
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  FrontSide,
  Mesh,
  MeshBasicMaterial,
} from "three";


/**
 * 
 * 注意事项:
 * 三组坐标组成一个三角面，如果从视野角度观察这三个点连接顺序是逆时针连接，该面就是正面，否则就是反面（three.js默认正面可见，反面不可见）
 * 
 * 
 * 
 * 
 */

// 空的几何体对象
const geometry = new BufferGeometry();
// 用类型化数组定义一组顶点坐标
const vertices = new Float32Array([
  0,0,0, //顶点1坐标
  50,0,0, // 顶点2坐标
  0,100,0, // 顶点3坐标
  0, 0, 10,
  0, 0, 100,
  50, 0, 10, // 顶点6坐标
]);

// BufferAttribute 将坐标数组转换为顶点数据 第二个参数表示:几个数据为一组表示一个顶点
const attribute = new BufferAttribute(vertices, 3);
// 设置几何体的顶点位置属性
geometry.attributes.position = attribute;

// 网格材质
const material = new MeshBasicMaterial({
  color: 0x00ffff,
  side: DoubleSide, // FrontSide 正面可见(默认)  DoubleSide双面可见  BackSide反面可见
});

// 网格模型渲染自定义几何体
const mesh = new Mesh(geometry,material)

export { mesh };
