import React from "react";
import { Link } from "react-router-dom";
import insta_logo from "./img/insta_logo.png";

const Signup = () => {
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
                  type="text"
                  id="credential"
                  name="credential"
                  placeholder="Mobile number or email"
                  autoComplete="off"
                  className="w-full mx-auto p-2 text-xs my-1 border border-slate-300 rounded"
                />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  autoComplete="off"
                  className="w-full mx-auto p-2 text-xs my-1 border border-slate-300 rounded"
                />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  autoComplete="off"
                  className="w-full mx-auto p-2 text-xs my-1 border border-slate-300 rounded"
                />
                {/* <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="off"
                  className="w-full mx-auto p-2 text-xs my-1 border border-slate-300 rounded"
                /> */}
                <input
                  type="password"
                  id="password"
                  name="password"
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
                className="w-full bg-sky-400 text-white p-1 my-3 rounded-md"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
        <div className="sm:border border-slate-300 my-4 p-5 text-sm text-center">
          Have an account? <Link to="/">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
