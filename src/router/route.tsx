import { Navigate, RouteObject } from "react-router-dom";
import { BaseLayout } from "../layout";
import ThreeDemo1 from "../views/demo1";
import Base01 from "../views/入门篇/base_01_入门";
import Base02 from "../views/入门篇/base_02_漫反射材质";
import Base03 from "../views/入门篇/base_03_轨道控制器";
import Base04 from "../views/入门篇/base_04_环境光与平行光";
import Base05 from "../views/入门篇/base_05_动画循环渲染";
import Base06 from "../views/入门篇/base_06_staus帧率";
import Base07 from "../views/入门篇/base_07_阵列立方体和相机适配";
import Base08 from "@/views/入门篇/base_08_其它几何体";
import Base09 from "@/views/入门篇/base_09_高光网格材质";
import Base10 from "@/views/入门篇/base_10_渲染器设置";
import Base11 from "@/views/入门篇/base_11_gui";
import Middle01 from "@/views/几何体BufferGeometry/m_01顶点位置数据和点模型对象";
import Middle02 from "@/views/几何体BufferGeometry/m_02线模型对象";
import Middle03 from "@/views/几何体BufferGeometry/m_03网格模型mesh渲染顶点数据";
import Middle04 from "@/views/几何体BufferGeometry/m_04构建平面矩形几何体";
import Middle05 from "@/views/几何体BufferGeometry/m_05几何体顶点索引";

export const rootRouter: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/base/demo1" />,
  },
  {
    path: "/base",
    element: <BaseLayout></BaseLayout>,
    children: [
      {
        path: "demo1",
        element: <ThreeDemo1 />,
        handle: {
          title: "demo1",
          key: "demo1",
        },
      },
      {
        path: "base01",
        element: <Base01 />,
        handle: {
          title: "入门",
        },
      },
      {
        path: "base02",
        element: <Base02 />,
        handle: {
          title: "漫反射材质",
        },
      },
      {
        path: "base03",
        element: <Base03 />,
        handle: {
          title: "轨道控制器",
        },
      },
      {
        path: "base04",
        element: <Base04 />,
        handle: {
          title: "环境光与平行光",
        },
      },
      {
        path: "base05",
        element: <Base05 />,
        handle: {
          title: "动画循环渲染",
        },
      },
      {
        path: "base06",
        element: <Base06 />,
        handle: {
          title: "渲染帧率",
        },
      },
      {
        path: "base07",
        element: <Base07 />,
        handle: {
          title: "渲染帧率",
        },
      },
      {
        path: "base08",
        element: <Base08 />,
        handle: {
          title: "其它几何体",
        },
      },
      {
        path: "base09",
        element: <Base09 />,
        handle: {
          title: "高光网格材质",
        },
      },
      {
        path: "base10",
        element: <Base10 />,
        handle: {
          title: "渲染器设置",
        },
      },
      {
        path: "base11",
        element: <Base11 />,
        handle: {
          title: "dat.gui",
        },
      },
    ],
  },
  {
    path: "/middle",
    element: <BaseLayout></BaseLayout>,
    children: [
      {
        path: "middle01",
        element: <Middle01></Middle01>,
        handle: {
          title: "几何体顶点位置和点模型对象",
        },
      },
      {
        path: "middle02",
        element: <Middle02></Middle02>,
        handle: {
          title: "线模型对象",
        },
      },
      {
        path: "middle03",
        element: <Middle03></Middle03>,
        handle: {
          title: "网格模型渲染自定义几何体",
        },
      },
      {
        path: "middle04",
        element: <Middle04></Middle04>,
        handle: {
          title: "矩形平面几何体",
        },
      },
      {
        path: "middle05",
        element: <Middle05></Middle05>,
        handle: {
          title: "几何体顶点索引",
        },
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
];
