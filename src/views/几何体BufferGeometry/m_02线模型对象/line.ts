import { BufferAttribute, BufferGeometry, Line, LineBasicMaterial, LineLoop, LineSegments, Points, PointsMaterial } from "three";

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

// 线材质
const matreial = new LineBasicMaterial({
  color:0xffff00
})

const lineModel = new Line(geometry, matreial)

// LineLoop 闭合线条 结束点和起始点会自动连接
//new LineLoop(geometry, matreial);

// LineSegments 非连续线条(如果一个点已经有连线,就不会再连接一条线，简单点就是:第一个点和第二个点连接条线，第三个点和第四个点连接条线，第五个点和第六个点连接条线)
//LineSegments(geometry, matreial);

export { lineModel };
