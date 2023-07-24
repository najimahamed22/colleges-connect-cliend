import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../../Provider/AuthProvider";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  // const user = null;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full fixed z-10">
      <nav className="bg-[#007E70]   sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3">
        <div className="flex items-center justify-between px-4 py-3 sm:p-0">
          <div className="inline-flex items-center gap-5">
            <div>
              <img
                src="https://d33wubrfki0l68.cloudfront.net/7532cdd5fcdc574e355f74717c61897907ed9ff1/d86a7/assets/img/logo/logo.png"
                alt="Logo"
                className="h-12 w-15 rounded-full border-white border-2 ml-2"
              />
            </div>
            <Link to="/" className="text-white text-2xl font-bold">
              Colleges Connect
            </Link>
          </div>
          <div className="sm:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-white focus:outline-none focus:text-white"
              aria-label="toggle menu"
              onClick={toggleMenu}>
              <FaBars />
            </button>
          </div>
        </div>
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } sm:flex sm:items-center items-center sm:w-auto`}>
          <div className="px-2 pt-2 pb-2 sm:flex">
            <NavLink
              to="/"
              exact="true"
              className="block px-2 py-1 text-white font-semibold rounded hover:bg-cyan-900 sm:mt-0 sm:ml-2">
              Home
            </NavLink>

            <NavLink
              to="/colleges"
              exact="true"
              className="block px-2 py-1 text-white font-semibold rounded hover:bg-cyan-900 sm:mt-0 sm:ml-2">
              Colleges
            </NavLink>
            <NavLink
              to="/admission"
              exact="true"
              className="block px-2 py-1 text-white font-semibold rounded hover:bg-cyan-900 sm:mt-0 sm:ml-2">
              Admission
            </NavLink>
            <NavLink
              to="/mycollege"
              exact="true"
              className="block px-2 py-1 text-white font-semibold rounded hover:bg-cyan-900 sm:mt-0 sm:ml-2">
              My College
            </NavLink>
            <div className="form-control ">
              <Link>
                <label className="input-group">
                  <input
                    type="text"
                    placeholder="Collage Name"
                    className="input w-36 block px-2 py-1 h-10 font-semibold rounded  sm:mt-0 sm:ml-2 input-bordered"
                    required
                  />
                  <span className="cursor-pointer bg-cyan-900 text-white font-bold">
                    Search
                  </span>
                </label>
              </Link>
            </div>
          </div>
        </nav>
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } sm:flex sm:items-center sm:w-auto`}>
          <div className="px-2 md:pt-2 text-white text-lg font-semibold pb-2 sm:flex">
            <div>
              {user && user.photoURL ? (
                <Link to={`/users/${user?.email}`}>
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="h-12 w-15 rounded-full border-white border-2 ml-2"
                    title={user.displayName || ""}
                  />
                </Link>
              ) : (
                <></>
              )}
            </div>
            {user ? (
              <div className="md:inline-flex items-center">
                <NavLink
                  to="/profile"
                  // to={`/users/${user?.email}`}
                  exact="true"
                  className="block px-2 py-1  hover:bg-cyan-900 hover:rounded-lg sm:mt-0 sm:ml-2">
                  Profile
                </NavLink>
                <button
                  onClick={handleLogOut}
                  className="block px-2 py-1   hover:bg-cyan-900 hover:rounded-lg sm:mt-0 sm:ml-2">
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                exact="true"
                className="block px-2 py-1  hover:bg-cyan-900 hover:rounded-lg sm:mt-0 sm:ml-2">
                Login
              </NavLink>
            )}
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavBar;
