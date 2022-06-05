import react from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import logoutimg from '../../../img/icons8-logout-32.png'
import "./navbar.css";
const Navbar = () => {
  const opennav = () => {
    const icon = document.querySelector('.toggler');
    icon.onclick = () => {
      document.querySelector('.icon-opts .nav').classList.toggle('open');
      document.querySelector('.toggler').classList.toggle('fa-times');
    };
  };
  const history = useHistory();
  const logout = () => {
    window.localStorage.removeItem('user');
    history.push('/');
  };
  return (
    <react.Fragment>
      <div className="icon-opts">
      <i className="fa fa-ellipsis-h toggler" aria-hidden="true"onClick={opennav}></i>
        <ul className="nav justify-content-center">
          <NavLink to="/home" className="linkk">
            <li className="nav-item">
              <i className="fas fa-home"></i>
            </li>
          </NavLink>
          <NavLink to="/setting" className="linkk">
            <li className="nav-item">
              <i className="fas fa-cog"></i>
            </li>
          </NavLink>
          {/* <NavLink to="/mainchat" className="linkk">
            <li className="nav-item">
              <i className="fas fa-user-friends"></i>
            </li>
          </NavLink> */}
          {/* <NavLink to="/notifications" className="linkk">
            <li className="nav-item">
              <i className="fas fa-bell"></i>
            </li>
          </NavLink> */}
          <NavLink to="/calendar" className="linkk">
            <li className="nav-item">
              <i className="fas fa-calendar-alt"></i>
            </li>
          </NavLink>
        </ul>
        <div className="logimg">
            <img src={logoutimg} alt="a" onClick={logout}/></div>
      </div>
    </react.Fragment>
  );
};
export default Navbar;
