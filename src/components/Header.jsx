import React from "react";
import { useContext } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AuthContext from "../ContextManagers/AuthContext";
import logo from "../images/logo.png"

function Header() {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <div id="header">
      <img src={logo} alt="logo image"/>

      {user ? (
        <div className="header-contents">
        {/* <p className="header-content">{user.fName}</p> */}
          <Link to="/dashboard" className="header-content">Dashboard</Link>
          <div onClick={logoutUser} className="header-content">Logout</div>
        </div>
      ) : (
        <div className="header-contents">
          <Link to="/login" className="header-content">
            Login
          </Link>

          <Link to="/register" className="header-content">
            register
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
