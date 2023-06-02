import React from "react";
import { Link } from "react-router-dom";
import { FaDumbbell, FaUtensils, FaBullseye, FaPlus, FaQuestionCircle, FaSignOutAlt, FaChartLine } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 bg-gray-200 h-screen">
      <div className="flex pl-4 items-center h-20 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold">Welcome</h1>
      </div>
      <nav className="flex flex-col py-4">
        <Link
          to="/user/dashboard"
          className="px-6 py-2 text-gray-800 hover:bg-gray-300 flex items-center justify-between"
        >
          <span>Joined Workouts</span>
          <FaDumbbell className="mr-2" />
        </Link>
        <Link
          to="/joined-diets"
          className="px-6 py-2 text-gray-800 hover:bg-gray-300 flex items-center justify-between"
        >
          <span>Joined Diets</span>
          <FaUtensils className="mr-2" />
        </Link>
        <Link to="/goals" className="px-6 py-2 text-gray-800 hover:bg-gray-300 flex items-center justify-between">
          <span>Goals</span>
          <FaBullseye className="mr-2" />
        </Link>
        <Link
          to="/create-goal"
          className="px-6 py-2 text-gray-800 hover:bg-gray-300 flex items-center justify-between"
        >
          <span>Create New Goal</span>
          <FaPlus className="mr-2" />
        </Link>
        <Link
          to="/analytics"
          className="px-6 py-2 text-gray-800 hover:bg-gray-300 flex items-center justify-between"
        >
          <span>Analytics</span>
          <FaChartLine className="mr-2" />
        </Link>
        <Link to="/help" className="px-6 py-2 text-gray-800 hover:bg-gray-300 flex items-center justify-between">
          <span>Help</span>
          <FaQuestionCircle className="mr-2" />
        </Link>
        <Link
          to="/logout"
          className="px-6 py-2 text-gray-800 hover:bg-gray-300 flex items-center justify-between"
        >
          <span>Logout</span>
          <FaSignOutAlt className="mr-2" />
        </Link>
        
      </nav>
    </div>
  );
};

export default Sidebar;
