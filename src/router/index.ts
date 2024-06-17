import { useRoutes } from "react-router-dom";
import { rootRouter } from "./route";

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
