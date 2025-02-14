import React from "react";
import { LuInstagram } from "react-icons/lu";
import { FaMeta, FaXTwitter  } from "react-icons/fa6";
import { FaLinkedinIn, FaGithub  } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-white py-3 px-4">
      <ul className="flex justify-center gap-6">
        <li className="hover:scale-110 hover:text-blue-400"><a href="#" className="px-2"><LuInstagram /></a></li>
        <li className="hover:scale-110 hover:text-blue-400"><a href="#" className="px-2"><FaMeta /></a></li>
        <li className="hover:scale-110 hover:text-blue-400"><a href="#" className="px-2"><FaLinkedinIn /></a></li>
        <li className="hover:scale-110 hover:text-blue-400"><a href="#" className="px-2"><FaGithub /></a></li>
        <li className="hover:scale-110 hover:text-blue-400"><a href="#" className="px-2"><FaXTwitter /></a></li>
      </ul>
      <div>
        <h5 className="text-center text-green-600 font-bold text-lg">FarmerApp</h5>
        <p className="text-center text-gray-400">
          FarmerApp is dedicated to Farmers where they can buy or sell their Items easily from Home.
        </p>
      </div>
      <p className="text-center text-gray-500 pt-2">All Rights Reserved ©2025</p>
    </footer>
  );
};

export default Footer;