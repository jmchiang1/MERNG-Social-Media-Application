import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/Auth";
import './CSS/Navbar.css'
// import { Mutation } from "react-apollo";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <div className="navbar-container">
      <h1>CLIMATE CHANGE</h1>
      <h2>Welcome Back: {user.username}</h2>
      <a href="/" onClick={handleItemClick}>
        Home
      </a>
      <a href="/" onClick={logout}>
        Logout
      </a>
    </div>
  ) : (
    <div className="navbar-container">
      <h1>CLIMATE CHANGE</h1>
      <a href="/" onClick={handleItemClick}>
        Home
      </a>
      <a href="/login" onClick={handleItemClick}>
        Login
      </a>
      <a href="/register" onClick={handleItemClick}>
        Register
      </a>
    </div>
  );

  return menuBar;
}

export default Navbar;

// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import "./CSS/Navbar.css";
// import { AuthContext } from "../Context/Auth";

// function Navbar() {
//   const { user, logout } = useContext(AuthContext);

//   const notAuthenticated = (
//     <div className="navbar-container">
//       <p>
//         <Link to="/">Home</Link>
//       </p>
//       <p>
//         {" "}
//         <Link to="/register">Signup</Link>{" "}
//       </p>
//       <p>
//         <Link to="/login">Login</Link>
//       </p>
//     </div>
//   );

//   const Authenticated = (
//     <div className="navbar-container">
//       <p>
//         <p>Hello {user}</p>
//       </p>
//       <p>
//         <a onClick={logout} href="/">
//           Logout
//         </a>
//       </p>
//     </div>
//   );

//   return (
//     <div className="navbar-container">
//       <p>
//         <Link to="/">Home</Link>
//       </p>
//       <p>
//         {" "}
//         <Link to="/register">Signup</Link>{" "}
//       </p>
//       <p>
//         <Link to="/login">Login</Link>
//       </p>
//       {/* <p>
//           <a href="/" onClick={logout}>Logout</a>
//       </p> */}
//     </div>
//   );
// }

// export default Navbar;
