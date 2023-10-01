import React, { useState } from "react";
import insta_logo from "./img/insta_logo.png";
import { FaBars, FaHome, FaPlus, FaUser, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:flex md:justify-between md:items-center bg-slate-100 p-5 border border-slate-300">
      <div className="flex justify-between items-center">
        <img src={insta_logo} alt="Instagram Logo" className="h-12 w-48" />

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-xl">
            <FaBars />
          </button>
        </div>
      </div>

      <div
        className={`md:flex items-center justify-center mt-4 md:mt-0 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="md:flex gap-6">
          <li className="md:text-lg">
            <Link to="/Home" className="flex gap-2 items-center  menu-item">
              <FaHome className="menu-icon" />
              Home
            </Link>
          </li>
          <li className="md:text-lg">
            <Link
              to="/Createpost"
              className="flex gap-2 items-center  menu-item"
            >
              <FaPlus className="menu-icon" />
              Create Post
            </Link>
          </li>
          <li className="md:text-lg">
            <Link to="/Profile" className="flex gap-2 items-center  menu-item">
              <FaUser className="menu-icon" />
              Profile
            </Link>
          </li>

          <li className="md:text-lg">
            <Link to="/" className="flex gap-2 items-center  menu-item">
              <FaHeart className="menu-icon" />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
