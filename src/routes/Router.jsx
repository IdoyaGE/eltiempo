import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import Prediction from "../components/Prediction";
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
  {
    path: "/prediction",
    element: <Prediction />,
  },
]);

export default Router;
