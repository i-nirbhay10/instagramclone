import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import insta_logo from "./img/insta_logo.png";

const Signup = () => {
  const navigate = useNavigate();
  const notifyE = (msg) => toast.error(msg);
  const notifyS = (msg) => toast.success(msg);

  const [user, setuser] = useState({
    email: "",
    name: "",
    username: "",
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
    const { email, name, username, password } = user;

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        username,
        password,
      }),
    });

    const data = await res.json();

    console.log(data);
    if (res.status === 422) {
      notifyE(data.message);
      console.log("invelid cradintial ");
    } else {
      notifyS(data.message);
      console.log("registration successfull");
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen justify-center ">
      <div className="bg-white m-3">
        <div
          className="sm:border border-slate-300 mx-auto pt-11 pb-8"
          style={{ width: "350px" }}
        >
          <div className="mx-auto" style={{ width: "270px" }}>
            <div className="flex justify-center ">
              <img
                src={insta_logo}
                alt="Instagram Logo"
                className="h-12 w-48"
              />
            </div>
            <div className="p-4 text-slate-600 text-center">
              <p>Sign up to see photos and videos from your friends.</p>
            </div>
            <div className="text-center">
              <button className="w-full bg-sky-500 text-white mx-auto p-1 rounded">
                Log in with Google
              </button>
            </div>
            <div className="text-center py-3">OR</div>
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
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={datainput}
                  placeholder="Full Name"
                  autoComplete="off"
                  className="w-full mx-auto p-2 text-xs my-1 border border-slate-300 rounded"
                />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={datainput}
                  placeholder="Username"
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
            <div className="p-2 text-slate-600 text-xs text-center">
              <p>
                People who use our service may have uploaded your contact
                information to Instagram. Learn More
              </p>
            </div>
            <div className="p-2 text-slate-600 text-xs text-center">
              <p>
                By signing up, you agree to our <Link to="/">Terms</Link>
                <Link to="/">Privacy Policy</Link>, and
                <Link to="/">Cookies Policy</Link>
              </p>
            </div>

            <div className="text-center">
              <button
                className="w-full bg-sky-400 hover:bg-sky-600 text-white p-1 my-3 rounded-md"
                type="submit"
                onClick={clicked}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
        <div className="sm:border border-slate-300 my-4 p-5 text-sm text-center">
          Have an account?{" "}
          <Link to="/" className="text-blue-600">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
