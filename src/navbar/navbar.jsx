import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold">MyMemories</h1>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Navigation Links */}
        <ul
          className={`md:flex md:space-x-6 absolute md:static bg-blue-600 w-full md:w-auto left-0 transition-all duration-300 ease-in ${
            menuOpen ? "top-14 opacity-100" : "top-[-400px] opacity-0 md:opacity-100"
          }`}
        >
          <li>
            <NavLink
              to="/home"
              className="block px-4 py-2 hover:bg-blue-700 rounded"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/memories"
              className="block px-4 py-2 hover:bg-blue-700 rounded"
              onClick={() => setMenuOpen(false)}
            >
              Memories
            </NavLink>
          </li>
          <li>
          <NavLink
              to="/Members"
              className="block px-4 py-2 hover:bg-blue-700 rounded"
              onClick={() => setMenuOpen(false)}
            >
              Members
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="block px-4 py-2 hover:bg-blue-700 rounded"
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>
          </li>
          

          {/* Conditionally Render Auth Buttons */}
          {!isAuthenticated ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className="block px-4 py-2 hover:bg-blue-700 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className="block px-4 py-2 hover:bg-blue-700 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  Signup
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
