import { Navigate, RouteObject, createBrowserRouter } from "react-router";
import { BaseLayout } from "../layout";
// import ThreeDemo1 from "../views/demo1";
// import Base01 from "../views/stage_01_入门篇/base_01_入门";
// import Base02 from "../views/stage_01_入门篇/base_02_漫反射材质";
// import Base03 from "../views/stage_01_入门篇/base_03_轨道控制器";
// import Base04 from "../views/stage_01_入门篇/base_04_环境光与平行光";
// import Base05 from "../views/stage_01_入门篇/base_05_动画循环渲染";
// import Base06 from "../views/stage_01_入门篇/base_06_staus帧率";
// import Base07 from "../views/stage_01_入门篇/base_07_阵列立方体和相机适配";
// import Base08 from "@/views/stage_01_入门篇/base_08_其它几何体";
// import Base09 from "@/views/stage_01_入门篇/base_09_高光网格材质";
// import Base10 from "@/views/stage_01_入门篇/base_10_渲染器设置";
// import Base11 from "@/views/stage_01_入门篇/base_11_gui";
// import Middle01 from "@/views/stage_02_几何体BufferGeometry/m_01顶点位置数据和点模型对象";
// import Middle02 from "@/views/stage_02_几何体BufferGeometry/m_02线模型对象";
// import Middle03 from "@/views/stage_02_几何体BufferGeometry/m_03网格模型mesh渲染顶点数据";
// import Middle04 from "@/views/stage_02_几何体BufferGeometry/m_04构建平面矩形几何体";
// import Middle05 from "@/views/stage_02_几何体BufferGeometry/m_05几何体顶点索引";
// import Middle06 from "@/views/stage_02_几何体BufferGeometry/m_06顶点法向量";
// import Middle07 from "@/views/stage_02_几何体BufferGeometry/m_07内置几何体顶点结构";
// import Middle08 from "@/views/stage_02_几何体BufferGeometry/m_08几何体旋转缩放平移";
// import Stage03Example01 from "@/views/stage_03_模型对象/01_欧拉Euler与角度属性.rotation";
//import { RouterVo } from "@/types/route";
import LazyLoad from "@/components/lazy";
import { lazy } from "react";
import { treeData } from "./data";
import { RouterMenuVo } from "@/types/route";

const modules = import.meta.glob("@/views/**/*/index.tsx");
export const LoadView = (path: string) => {
  return LazyLoad(lazy(modules[`/src/views/${path}/index.tsx`] as any));
};

const transformData = (data: RouterMenuVo[]) => {
  const result: RouteObject[] = [];
  for (let i = 0; i < data.length; i++) {
    const item: RouteObject = {
      path: getPath(data[i]),
      handle: {
        title: data[i].title,
      },
    };

    if (data[i].component) {
      item.element = LoadView(data[i].component!);
    }

    if (data[i].children && data[i].children?.length) {
      item.children = transformData(data[i].children!);
    }

    result.push(item);
  }

  return result;
};

const getPath = (data:{ value: string, title: string, component?: string }) => { 
  if (data.value.includes("/")) { 
    return data.value.substring(data.value.lastIndexOf("/") + 1)
  }
  return data.value
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/base/base01" />,
  },
  {
    path: "/",
    element: <BaseLayout></BaseLayout>,
    children: transformData(treeData),
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
];


export const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_BASE_URL,
}) as any;
