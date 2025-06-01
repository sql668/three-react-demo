import { useRoutes, RouterProvider } from "react-router";
import { router } from "./route";

const Router = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
};

export default Router;
