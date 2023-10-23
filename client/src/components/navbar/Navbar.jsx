import "./navbar.css";
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to="/">
        <h3>NeoG</h3>
      </NavLink>

      <div>
        <NavLink to="/hospital">Hospital</NavLink>
        <NavLink to="/wards">Wards</NavLink>
        <NavLink to="/patients">Patients</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
