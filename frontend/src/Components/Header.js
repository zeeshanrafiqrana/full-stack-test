import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // Function to determine the border color based on the pathname
  const getBorderColor = (path) => {
    return location.pathname === path ? "#00ffff" : "transparent";
  };

  return (
    <header className="bg-gray-800 p-4">
      <nav className="header-nav flex justify-between items-center border-b-2 border-gray-800 pb-4">
        <div className="flex items-center">
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className={`text-white hover:text-gray-300 text-lg ${
                  location.pathname === "/" ? "text-gray-400" : ""
                }`}
                style={{
                  color: location.pathname === "/" ? "#00ffff" : "#ffffff",
                  borderBottom: `4px solid ${getBorderColor("/")}`,
                  paddingBottom:"17px"
                }}
              >
                Share price
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className={`text-white hover:text-gray-300 text-lg ${
                  location.pathname === "/dashboard" ? "text-gray-400" : ""
                }`}
                style={{
                  color:
                    location.pathname === "/dashboard" ? "#00ffff" : "#ffffff",
                  borderBottom: `4px solid ${getBorderColor("/dashboard")}`,
                  paddingBottom:"17px"
                }}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/entrylist"
                className={`text-white hover:text-gray-300 text-lg ${
                  location.pathname === "/entrylist" ? "text-gray-400" : ""
                }`}
                style={{
                  color:
                    location.pathname === "/entrylist" ? "#00ffff" : "#ffffff",
                  borderBottom: `4px solid ${getBorderColor("/entrylist")}`,
                  paddingBottom:"17px"
                }}
              >
                Entry List
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
