import react from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  return (
    <react.Fragment>
      <div className="icon-opts">
        <ul className="nav justify-content-center">
          <NavLink to="/home" className="linkk">
            <li className="nav-item">
              <i className="fas fa-home"></i>
            </li>
          </NavLink>
          <NavLink to="/room/:roomId" className="linkk">
            <li className="nav-item">
              <i className="fas fa-cog"></i>
            </li>
          </NavLink>
          <NavLink to="/createee" className="linkk">
            <li className="nav-item">
              <i className="fas fa-calendar-alt"></i>
            </li>
          </NavLink>
          <NavLink to="/createee" className="linkk">
            <li className="nav-item">
              <i className="fas fa-user-friends"></i>
            </li>
          </NavLink>
          <NavLink to="/createee" className="linkk">
            <li className="nav-item">
              <i className="fas fa-bell"></i>
            </li>
          </NavLink>
        </ul>
      </div>
    </react.Fragment>
  );
};
export default Navbar;
