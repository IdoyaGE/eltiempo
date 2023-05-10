import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/prediction'>Predicciones</Link>
      <Link to='/beach'>Playas</Link>
    </nav>
  );
};
export default Navbar;
