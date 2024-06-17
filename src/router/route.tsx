import { Navigate, RouteObject } from "react-router-dom";
import { BaseLayout } from "../layout";
import ThreeDemo1 from "../views/demo1";

export const rootRouter: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/three/demo1" />,
  },
  {
    path: "/three",
    element: <BaseLayout></BaseLayout>,
    children: [
      {
        path: "demo1",
        element: <ThreeDemo1 />,
        handle: {
          requiresAuth: false,
          title: "demo1",
          key: "demo1",
        },
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
];
