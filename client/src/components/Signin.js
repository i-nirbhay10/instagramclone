import React from "react";
import insta_logo from "./img/insta_logo.png";
import { Link } from "react-router-dom";
const Signin = () => {
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
                    type="text"
                    id="credential"
                    name="credential"
                    placeholder="Mobile number, username or email"
                    autoComplete="off"
                    className="w-full mx-auto p-2 text-xs my-1 border border-slate-300 rounded"
                  />

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
              <div className="text-center">
                <button
                  className="w-full bg-sky-400 text-white p-1 my-3 rounded-md"
                  type="submit"
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
