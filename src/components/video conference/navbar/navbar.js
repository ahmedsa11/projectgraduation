import react from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  const opennav = () => {
    const icon = document.querySelector('.toggler');
    icon.onclick = () => {
      document.querySelector('.icon-opts .nav').classList.toggle('open');
      document.querySelector('.toggler').classList.toggle('fa-toggle-on');
 
    };
  };
  return (
    <react.Fragment>
      <div className="icon-opts">
      <i className="fas fa-toggle-off toggler" onClick={opennav}></i>
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
          <NavLink to="/calender" className="linkk">
            <li className="nav-item">
              <i className="fas fa-calendar-alt"></i>
            </li>
          </NavLink>
          <NavLink to="/frinds" className="linkk">
            <li className="nav-item">
              <i className="fas fa-user-friends"></i>
            </li>
          </NavLink>
          <NavLink to="/nef" className="linkk">
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
