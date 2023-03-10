import { Outlet, NavLink } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <>
      <nav className="app-container-navbar">
        <div className="app-container-navbar__item">
          <NavLink to="/">Home</NavLink>
        </div>
        <div className="app-container-navbar__item">
          <NavLink to="/Statistics">Statistics</NavLink>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
