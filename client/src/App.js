// import logo from "./logo.svg";
// import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route exact path="/" element={<Signin />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route
            path="*"
            element={
              <div>
                <h1>erorr 404 this page is not exist!</h1>
              </div>
            }
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;

/* <img src={logo} className="App-logo" alt="logo" /> */
