import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import Prediction from "../components/Prediction";
import Beaches from "../components/Beaches";
const Router = createBrowserRouter([
  {
    path: "/", //lo dejamos vacio  para que se recoja en localhost:3000 sin poner /Home
    element: <Home />,
    errorElement: <h1>404 Not Found</h1>,
  },
  {
    path: "/about",
    element: <About />,
  },
  //Inluimos el id para meter los datos del municipio
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
]);

export default Router;
