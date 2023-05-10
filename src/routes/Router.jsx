import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Prediction from "../components/Prediction";
import Beaches from "../components/Beaches";
const Router = createBrowserRouter([
  {
    path: "/", //lo dejamos vacio  para que se recoja en localhost:3000 sin poner /Home
    element: <Home />,
    errorElement: <h1>404 Not Found</h1>,
    children: [
      {
        path: "/prediction",
        element: <Prediction />,
        children: [
          {
            path: ":id",
            element: <Prediction />,
          },
        ],
      },
      {
        path: "/beach",
        element: <Beaches />,
        children: [
          {
            path: ":id",
            element: <Beaches />,
          },
        ],
      },
    ],
  },
]);

export default Router;
