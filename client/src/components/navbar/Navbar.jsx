import "./navbar.css";
import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to="/">
        <img src={logo} alt="logo" />
      </NavLink>

      <div>
        <NavLink to="/patients">Patients</NavLink>
        <NavLink to="/wards">Wards</NavLink>
        <NavLink to="/hospital">Hospital</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
