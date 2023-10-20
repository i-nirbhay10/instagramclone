import insta_logo from "./img/insta_logo.png";
import { FaHome, FaRegPlusSquare, FaUser } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  const defaultuser = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className="fixed bottom-0 md:top-0 md:bottom-full w-full">
      <div className="md:flex md:justify-between md:items-center bg-white md:bg-slate-100 w-full px-5 py-3 border border-slate-300">
        <div className="hidden md:block flex md:justify-between  items-center">
          <Link to="/Home">
            <div className="flex jystify-center items-center">
              <img
                src={insta_logo}
                alt="Instagram Logo"
                className="h-12 w-48 mr-3"
              />
            </div>
          </Link>
        </div>

        <div>
          <ul className="flex items-center justify-between gap-6">
            <Link to="/Home">
              <li className="flex gap-2 items-center text-2xl md:text-lg">
                <FaHome className="menu-icon" />
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
                <FaUser className="hidden md:block menu-icon" />
                <img
                  src={
                    JSON.parse(localStorage.getItem("userinfo")).photo
                      ? JSON.parse(localStorage.getItem("userinfo")).photo
                      : defaultuser
                  }
                  alt="profile pic"
                  className="h-8 w-8 rounded-full border-2 border-indigo-600  md:hidden"
                />
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
