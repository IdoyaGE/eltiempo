import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Home page</p>
      <Link to='/prediction'>Predicciones</Link>
      <Link to='/beaches'>Playas</Link>
    </div>
  );
};
export default Home;
