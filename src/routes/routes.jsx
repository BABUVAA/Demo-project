import { createBrowserRouter } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import SearchUser from "../pages/SearchUser";
import SubUserManagement from "../pages/SubUserManagement";
import UserPrivileges from "../pages/UserPrivileges";
import NetworkManagement from "../pages/NetworkManagement";
import SearchGames from "../pages/SearchGames";
import UploadGame from "../pages/UploadGame";
import GenerateData from "../pages/GenerateData";
import PrintData from "../pages/PrintData";

// Lazy load the page components
const App = lazy(() => import("../pages/App"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

// Fallback loading component for Suspense
const Loading = () => <LoadingSpinner />;

// App Routes
const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        index: true, // This makes the Login page the default for the root path
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: <SearchGames />,
          },
          {
            path: "searchGames",
            element: <SearchGames />,
          },
          {
            path: "searchUser",
            element: <SearchUser />,
          },
          {
            path: "subUserRegistration",
            element: <SubUserManagement />,
          },
          {
            path: "editUserPrivileges",
            element: <UserPrivileges />,
          },
          {
            path: "networkAccessManagement",
            element: <NetworkManagement />,
          },

          {
            path: "uploadGames",
            element: <UploadGame />,
          },
          {
            path: "generateData",
            element: <GenerateData />,
          },
          {
            path: "printData",
            element: <PrintData />,
          },
        ],
      },
      {
        path: "logout",
        element: <Login />,
      },
      // No React route for /downloads/*, handled by server
      // Ensure the backend serves static files for "/downloads/*"
      {
        path: "downloads/*", // catch-all for file downloads
        element: <></>, // optional, you can remove this since the backend serves the file
      },
    ],
  },
]);

export default routes;
