import { BufferAttribute, BufferGeometry, Points, PointsMaterial } from "three";

// 空的几何体对象
const geometry = new BufferGeometry();
// 用类型化数组定义一组顶点坐标
const vertices = new Float32Array([
  0,
  0,
  0, //顶点1坐标
  50,
  0,
  0, // 顶点2坐标
  0,
  100,
  0, // 顶点3坐标
  0,
  0,
  10,
  0,
  0,
  100,
  50,
  0,
  100, // 顶点6坐标
]);

// BufferAttribute 将坐标数组转换为顶点数据 第二个参数表示:几个数据为一组表示一个顶点
const attribute = new BufferAttribute(vertices, 3);
// 设置几何体的顶点位置属性
geometry.attributes.position = attribute;

const material = new PointsMaterial({
  color: 0xffff00,
  size: 10, //像素尺寸
});
// 定义点模型对象
const points = new Points(geometry, material);

export { points}
