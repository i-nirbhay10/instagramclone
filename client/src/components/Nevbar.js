import React, { useState } from "react";
import insta_logo from "./img/insta_logo.png";
import { FaBars, FaHome, FaRegPlusSquare, FaUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, json } from "react-router-dom";

const Navbar = () => {
  const defaultuser = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  // const [isOpen, setIsOpen] = useState(false);

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className="fixed bottom-0 md:top-0 md:bottom-full  w-full">
      <div className="md:flex md:justify-between md:items-center bg-slate-100 w-full p-5 border border-slate-300">
        <div className="hidden md:block flex md:justify-between  items-center">
          <Link to="/Home">
            <div className="flex jystify-center items-center">
              <img
                src={insta_logo}
                alt="Instagram Logo"
                className="h-12 w-48 mr-3"
              />
              {/* <img
                src={
                  !JSON.parse(localStorage.getItem("userinfo")).photo
                    ? defaultuser
                    : JSON.parse(localStorage.getItem("userinfo")).photo
                }
                alt="profile pic"
                className="h-10 w-10 rounded-full border-2 border-indigo-600"
              /> */}
            </div>
          </Link>

          {/* <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-xl">
              <FaBars />
            </button>
          </div> */}
        </div>

        <div
        // className={`md:flex items-center justify-center mt-4 md:mt-0 ${
        //   isOpen ? "block" : "hidden"
        // }`}
        >
          <ul className="flex items-center justify-between gap-6">
            <Link to="/Home">
              <li className="flex gap-2 items-center text-2xl md:text-lg">
                <FaHome className=" menu-icon" />
                <span className="hidden md:block">Home</span>
              </li>
            </Link>
            <Link to="/Createpost">
              <li className="flex gap-2 items-center text-2xl md:text-lg">
                <FaRegPlusSquare className=" menu-icon" />

                <span className="hidden md:block">New post</span>
              </li>
            </Link>
            <Link to="/Profile">
              <li className="flex gap-2 items-center text-2xl md:text-lg">
                <FaUser className=" menu-icon" />
                {/* <img
                  // src="https://images.unsplash.com/photo-1622977266039-dbb162254c12?ixlib=rb-4.0.3&ixid=M3xMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1835&q=80"
                  src={JSON.parse(localStorage.getItem("userinfo")).photo}
                  alt="profile pic"
                  className="h-12 w-12 rounded-full border-2 border-indigo-600"
                /> */}
                <span className="hidden md:block"> Profile</span>
              </li>
            </Link>
            <Link to="/Logout">
              <li className="flex gap-2 items-center text-2xl md:text-lg">
                <AiOutlineLogout className=" menu-icon" />

                <span className="hidden md:block"> Logout</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
