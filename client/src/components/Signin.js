import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import insta_logo from "./img/insta_logo.png";

const Signin = () => {
  const navigate = useNavigate();
  const notifyE = (msg) => toast.error(msg);
  const notifyS = (msg) => toast.success(msg);

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

  const clicked = async (e) => {
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
    if (res.status === 422) {
      notifyE(data.message);
      console.log("invelid cradintial ");
    } else {
      localStorage.setItem("jwt", data);
      notifyS("Logged in sucsessfull");
      console.log("registration successfull");
      navigate("/Home");
    }
  };

  useEffect(() => {
    const result = localStorage.getItem("jwt");
    if (result) {
      navigate("/Home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
                  Log in
                </button>
              </div>
              <div className="text-center py-2">OR</div>
              <div className="p-2 text-slate-600 text- text-center">
                <Link to="/">Log in with Google</Link>
              </div>
              <div className="p-2 text-slate-600 text-xs text-center">
                <Link to="/">Forgotten your password ?</Link>
              </div>
            </div>
          </div>
          <div className="sm:border border-slate-300 my-4 p-5 text-sm text-center">
            Don't have an account? <Link to="/Signup">Sign up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
