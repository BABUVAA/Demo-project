import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { TiHome } from "react-icons/ti";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import "../styles/index.css";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMgmtOpen, setIsUserMgmtOpen] = useState(false);
  const [isGameMgmtOpen, setIsGameMgmtOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout());
    navigate("/");
  };
  // Toggle burger menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Toggle User Management submenu
  const toggleUserMgmt = () => setIsUserMgmtOpen(!isUserMgmtOpen);

  // Toggle Game Management submenu
  const toggleGameMgmt = () => setIsGameMgmtOpen(!isGameMgmtOpen);

  return (
    <>
      <div className="flex flex-col">
        <header className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg w-full h-16 z-50">
          {/* Navbar */}
          <div className="flex items-center justify-between px-8 h-full">
            {/* Logo Section on the Left */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Burger Menu Icon for Small Screens (Right side) */}
            <div className="lg:hidden flex items-center ml-auto">
              <button onClick={toggleMenu} className="text-white">
                <div className="space-y-2">
                  {isMenuOpen ? (
                    <IoClose size={30} />
                  ) : (
                    <CiMenuBurger size={30} />
                  )}
                </div>
              </button>
            </div>

            {/* Navigation & Actions (For Large Screens) */}
            <div className="hidden lg:flex items-center gap-8">
              <Home />
              <GameMgmt />
              <UserMgmt />
              <Logout />
            </div>
          </div>
        </header>

        {/* Dropdown Menu for Small Screens */}
        <div
          className={`lg:hidden ${
            isMenuOpen ? "block" : "hidden"
          } bg-gray-800 text-white w-full p-4`}
        >
          <Link to="#" className="block py-2">
            Home
          </Link>

          <div className="border-t border-gray-700 pt-4">
            <div className="flex items-center justify-between py-2">
              <Link to="#" className="block">
                User Management
              </Link>
              <FaArrowDown
                className={`transition-transform duration-300 ${
                  isUserMgmtOpen ? "rotate-180" : ""
                }`}
                onClick={toggleUserMgmt}
                size={15}
              />
            </div>
            {isUserMgmtOpen && (
              <div className="pl-6 pb-4 border-t border-gray-700">
                <Link
                  to="#"
                  className="block py-2 hover:bg-gray-700 transition-colors"
                >
                  Search User
                </Link>
                <Link
                  to="#"
                  className="block py-2 hover:bg-gray-700 transition-colors"
                >
                  Sub User Registration
                </Link>
                <Link
                  to="#"
                  className="block py-2 hover:bg-gray-700 transition-colors"
                >
                  Edit Sub User Privileges
                </Link>
                <Link
                  to="#"
                  className="block py-2 hover:bg-gray-700 transition-colors"
                >
                  Network Access Management
                </Link>
              </div>
            )}
          </div>

          <div className="border-t border-b border-gray-700 pt-4">
            <div className="flex items-center justify-between py-2">
              <Link to="#" className="block">
                Game Management
              </Link>
              <FaArrowDown
                className={`transition-transform duration-300 ${
                  isGameMgmtOpen ? "rotate-180" : ""
                }`}
                onClick={toggleGameMgmt}
                size={15}
              />
            </div>
            {isGameMgmtOpen && (
              <div className="pl-6 pb-4 border-t border-b border-gray-700">
                <Link
                  to="#"
                  className="block py-2 hover:bg-gray-700 transition-colors"
                >
                  Search Games
                </Link>
                <Link
                  to="#"
                  className="block py-2 hover:bg-gray-700 transition-colors"
                >
                  Upload New Game
                </Link>
                <Link
                  to="#"
                  className="block py-2 hover:bg-gray-700 transition-colors"
                >
                  Generate Test Ready Data
                </Link>
                <Link
                  to="#"
                  className="block py-2 hover:bg-gray-700 transition-colors"
                >
                  Generate Print Ready Data
                </Link>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-4" onClick={logOut}>
            <label>Logout</label> <Logout />
          </div>
        </div>

        <main className="flex flex-col mt-8 px-1 md:px-8 h-full">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;

const Logo = () => {
  return (
    <div className="flex items-center">
      <img src="/Logo.png" alt="Logo" className="h-10" />
    </div>
  );
};

const Home = () => {
  return (
    <NavLink
      to="#"
      className="text-white flex items-center hover:text-gray-300 transition-colors"
    >
      <TiHome size={30} />
    </NavLink>
  );
};

const UserMgmt = () => {
  return (
    <div className="ml-3 h-full flex items-center group relative">
      <div className="flex items-center gap-2 text-white">
        <label>User mgmt</label>
        <FaArrowDown
          className="transition-transform duration-300 group-hover:rotate-180"
          size={15}
        />
      </div>

      {/* Dropdown menu */}
      <div className="absolute left-0 w-48 hidden bg-white shadow-lg rounded-md mt-56 opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-300 z-50">
        <ul className="text-sm text-gray-700">
          <li>
            <Link
              to="#"
              className="block px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              Search User
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              Sub User Registration
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              Edit Sub User Privileges
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              Network Access Management
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const GameMgmt = () => {
  return (
    <div className="ml-3 h-full flex items-center group relative">
      <div className="flex items-center gap-2 text-white">
        <label>Game mgmt</label>
        <FaArrowDown
          className="transition-transform duration-300 group-hover:rotate-180"
          size={15}
        />
      </div>

      {/* Dropdown menu */}
      <div className="absolute left-0 w-48 hidden bg-white shadow-lg rounded-md mt-56 opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-300 z-50">
        <ul className="text-sm text-gray-700">
          <li>
            <Link
              to="#"
              className="block px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              Search Games
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              Upload New Game
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              Generate Test Ready Data
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              Generate Print Ready Data
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <NavLink
      onClick={logOut}
      to="#"
      className="text-white flex items-center hover:text-gray-300 transition-colors"
    >
      <IoMdLogOut size={25} />
    </NavLink>
  );
};
