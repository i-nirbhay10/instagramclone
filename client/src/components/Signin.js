import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";
import { toast } from "react-toastify";
import insta_logo from "./img/insta_logo.png";

const Signin = () => {
  const navigate = useNavigate();
  const notifyE = (msg) => toast.error(msg);
  const notifyS = (msg) => toast.success(msg);

  const [connecting, setconnecting] = useState(true);
  const [login, setlogin] = useState("Log in");
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  let name, value;
  const datainput = (event) => {
    name = event.target.name;
    value = event.target.value;

    setuser({ ...user, [name]: value });
  };

  // make connection

  const connect = async () => {
    try {
      const res = await fetch("http://localhost:5000/connect", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // login
  const clicked = async (e) => {
    try {
      setlogin("Logging in...");
      e.preventDefault();
      const { email, password } = user;
      const res = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setlogin("Log in");
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("userinfo", JSON.stringify(data.userdata));
        notifyS("Logged in sucsessfull");
        console.log("Logged in sucsessfull");
        navigate("/Home");
      } else {
        setlogin("Log in");
        notifyE(data.message);
        console.log("invelid cradintial ");
      }
    } catch (error) {
      console.log(error);
      setconnecting(true);
    }
  };

  // google login port
  const loginwithgoogle = async (credentialResponse) => {
    try {
      setconnecting(false);
      const decodecred = jwt_decode(credentialResponse.credential);
      console.log(decodecred);
      const res = await fetch("http://localhost:5000/googlelogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: decodecred.email,
          name: decodecred.name,
          username: decodecred.given_name,
          clientid: credentialResponse.clientId,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok || data) {
        notifyS("Logged in sucsessfull");
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("userinfo", JSON.stringify(data.userdata));
        console.log("loged in");
        navigate("/Home");
        setconnecting(true);
      } else {
        window.alert("invelid cradintial");
        console.log("invelid cradintial");
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    const result = localStorage.getItem("jwt");
    if (result) {
      navigate("/Home");
    } else {
      connect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {connecting ? (
        <div className="flex h-screen justify-center ">
          <div className="bg-white m-3">
            <div
              className="sm:border border-slate-300 mx-auto pb-8"
              style={{ width: "350px" }}
            >
              <div className="mx-auto" style={{ width: "270px" }}>
                <div className="flex justify-center p-11">
                  <img
                    src={insta_logo}
                    alt="Instagram Logo"
                    className="h-12 w-48"
                  />
                </div>
                <div className="flex flex-col text-center">
                  <form className="flex flex-col">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={datainput}
                      placeholder="Email"
                      autoComplete="off"
                      className="w-full mx-auto p-2 text-xs my-1 border border-slate-300 rounded"
                    />

                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={user.password}
                      onChange={datainput}
                      placeholder="Password"
                      autoComplete="off"
                      className="w-full mx-auto p-2 text-xs my-1 border border-slate-300 rounded"
                    />
                  </form>
                </div>
                <div className="text-center">
                  <button
                    className="w-full bg-sky-400 hover:bg-sky-600 text-white p-1 my-3 rounded-md"
                    type="submit"
                    onClick={clicked}
                  >
                    {login}
                  </button>
                </div>
                <div className="text-center py-2">OR</div>
                <div className=" flex justify-center p-2 text-slate-600 text-center">
                  <div>
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        loginwithgoogle(credentialResponse);
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </div>

                  {/* <Link to="/">Log in with Google</Link> */}
                </div>
                <div className="p-2 text-slate-600 text-xs text-center">
                  <Link to="/">Forgotten your password ?</Link>
                </div>
              </div>
            </div>
            <div className="sm:border border-slate-300 my-4 p-5 text-sm text-center">
              Don't have an account?{" "}
              <Link to="/Signup" className="text-blue-600">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center bg-[#e2e8f0]">
          <GridLoader color="#1C0202" />
        </div>
      )}
    </>
  );
};

export default Signin;
