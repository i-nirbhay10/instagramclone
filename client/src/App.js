// import logo from "./logo.svg";

import { Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Createpost from "./components/Createpost";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route exact path="/" element={<Signin />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/Createpost" element={<Createpost />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route
            path="*"
            element={
              <div>
                <h1>erorr 404 this page is not exist!</h1>
              </div>
            }
          />
        </Routes>
        <ToastContainer />
      </header>
    </div>
  );
}

export default App;

/* <img src={logo} className="App-logo" alt="logo" /> */
