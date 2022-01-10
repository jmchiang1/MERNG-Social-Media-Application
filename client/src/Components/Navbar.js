import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./CSS/Navbar.css";
import { AuthContext } from "../Context/Auth";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const notAuthenticated = (
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

  const Authenticated = (
    <div className="navbar-container">
      <p>
        <p>Hello {user}</p>
      </p>
      <p>
        <a onClick={logout} href="/">
          Logout
        </a>
      </p>
    </div>
  );

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
      {/* <p>
          <a href="/" onClick={logout}>Logout</a>
      </p> */}
    </div>
  );
}

export default Navbar;
