import { TiHome } from "react-icons/ti";
import { FaArrowDown } from "react-icons/fa"; // Import FaArrowDown
import { IoMdLogOut } from "react-icons/io";
import { Link, NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="flex  flex-wrap flex-col">
        <header className="flex flex-wrap content-center top-0 bg-slate-500 shadow-lg w-full h-14 z-50">
          {/* Navbar */}
          <div className="flex flex-wrap  w-full content-center justify-between bg-slate-500 p-1">
            <div className="flex flex-wrap content-center  gap-2">
              {/* Logo Section */}
              <div className="flex justify-between p-1">
                <img src="/Logo.png" alt="Logo" className="h-10" />
              </div>
              {/* Home button */}
              <div className="flex flex-wrap content-center">
                <NavLink to="/dashboard" className="ml-6">
                  <TiHome size={30} />
                </NavLink>
              </div>
              {/* User mgmt Dropdown */}
              <div className="ml-3 flex flex-wrap content-center group relative">
                <div className="flex flex-wrap justify-around content-center">
                  <label>User mgmt</label>
                  <div className="flex flex-wrap content-center ml-2">
                    <FaArrowDown
                      className="transition-transform duration-300 group-hover:rotate-180"
                      size={15}
                    />
                  </div>
                </div>

                {/* Dropdown menu that shows on hover */}
                <div className="absolute left-0 w-48 hidden bg-white shadow-lg rounded-md mt-12 opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-300">
                  <ul className="text-sm text-gray-700">
                    <li>
                      <Link
                        to="searchUser"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Search User
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="subUserRegistration"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Sub User Registration
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="editUserPrivileges"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Edit Sub User Privileges
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="networkAccessManagement"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Network Access Management
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Game mgmt Dropdown */}
              <div className="ml-3 flex flex-wrap content-center group relative">
                <div className="flex flex-wrap justify-around content-center">
                  <label>Game mgmt</label>
                  <div className="flex flex-wrap content-center ml-2">
                    <FaArrowDown
                      className="transition-transform duration-300 group-hover:rotate-180"
                      size={15}
                    />
                  </div>
                </div>

                {/* Dropdown menu that shows on hover */}
                <div className="absolute left-0 w-48 hidden bg-white shadow-lg rounded-md mt-12 opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-300 ">
                  <ul className="text-sm text-gray-700">
                    <li>
                      <Link
                        to="searchGames"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Search Games
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="uploadGames"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Upload New Game
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="generateData"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Generate Test Ready Data
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="printData"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Generate Print Ready Data
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center content-center mr-8">
              <NavLink to="/logout" className="ml-6">
                <div className="flex flex-wrap justify-around content-center">
                  <label>Logout</label>
                  <div className="flex flex-wrap content-center ml-2">
                    <IoMdLogOut size={15} />
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        </header>
        <main className="flex flex-wrap  mt-10 h-full">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
