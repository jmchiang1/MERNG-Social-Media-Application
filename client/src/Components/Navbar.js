// import React, { useState } from "react";
import { Link } from "react-router-dom";
import './CSS/Navbar.css'

function Navbar() {

  return (
    <div className="navbar-container">
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        {" "}
        <Link to="/register">Signup</Link>{" "}
      </p>
      <p>
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Navbar;
