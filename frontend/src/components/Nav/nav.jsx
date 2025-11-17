import React from "react";
import { Link, useLocation } from "react-router-dom";

function Nav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm h-[60px] flex items-center">
      <div className="max-w-[1120px] w-full mx-auto px-4 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="font-extrabold text-2xl lg:text-3xl tracking-wide text-blue-600">
          Life<span className="text-blue-800">Sync</span>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex space-x-6 text-gray-700 text-sm lg:text-base">
          <Link
            to="/home"
            className={`px-2 py-1 rounded hover:bg-blue-100 transition ${
              isActive("/home") ? "font-semibold text-blue-700 bg-blue-50" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/group-management"
            className={`px-2 py-1 rounded hover:bg-blue-100 transition ${
              isActive("/group-management") ? "font-semibold text-blue-700 bg-blue-50" : ""
            }`}
          >
            Group Management
          </Link>
          <Link
            to="/task-habits"
            className={`px-2 py-1 rounded hover:bg-blue-100 transition ${
              isActive("/task-habits") ? "font-semibold text-blue-700 bg-blue-50" : ""
            }`}
          >
            Task & Habits
          </Link>
        </nav>

      </div>
    </header>
  );
}

export default Nav;
