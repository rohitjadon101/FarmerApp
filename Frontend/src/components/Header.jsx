import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSignInAlt } from "react-icons/fa";
import Cookies from "universal-cookie";
import { UserContext } from "../context/UserContext";
const cookies = new Cookies();

function Header() {
  const navigate = useNavigate();
  const {user} = useContext(UserContext);

  return (
    <>
    <header className="flex justify-between items-center text-white bg-gradient-to-bl from-zinc-800 to-zinc-700 px-2 sm:px-20 py-5 shadow-lg">
      {/* Logo and Title */}
      <div className="flex items-center gap-3">
        <img src="https://img.lovepik.com/element/40027/9039.png_860.png" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"/>
        <h1 className="font-extrabold text-xl sm:text-[25px] tracking-wide text-green-600">FarmerApp</h1>
      </div>

      {/* Navigation */}
      <div>
        {user ? (
          <ul className="flex items-center gap-4 sm:gap-10 text-xs sm:text-base">
            <li><Link to={'/'} className="cursor-pointer flex items-center gap-2 hover:text-blue-300 hover:underline active:border-b-2 border-blue-300 transition-all"><FaHome /> Home</Link></li>
            <li>
              <div className="flex items-center gap-1 sm:gap-2 cursor-pointer" onClick={() => navigate('/profile')}>
                <img src={user.profile} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
                <h1>{user.name}</h1>
              </div>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center gap-4 sm:gap-10 text-xs sm:text-base">
            <li><Link to={'/'} className="cursor-pointer flex items-center gap-2 hover:text-blue-300 hover:underline active:border-b-2 border-blue-300 transition-all"><FaHome /> Home</Link></li>
            <li><Link to={'/login'} className="cursor-pointer flex items-center gap-2 hover:text-blue-300 hover:underline active:border-b-2 border-blue-300 transition-all"><FaSignInAlt /> Login</Link></li>
          </ul>
        )}
      </div>
    </header>
    </>
  );
}

export default Header;