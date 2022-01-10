import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/Auth";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Navbar from "./Components/Navbar";
import AuthRoute from "./Components/AuthRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* <Router> */}
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Login" element={ <Login/>  } />
            <Route exact path="/Register" element={<Register/> } />
            {/* <Route exact path="/Login" element={ <AuthRoute> <Login/> </AuthRoute> } />
            <Route exact path="/Register" element={<AuthRoute> <Register/> </AuthRoute>} /> */}
          </Routes>
        {/* </Router> */}
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
