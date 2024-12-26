import { createBrowserRouter } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import SearchGames from "../pages/SearchGames";
import GenerateData from "../pages/GenerateData";
// import ProtectedRoute from "../components/common/ProtectedRoute";

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
            path: "generateData",
            element: <GenerateData />,
          },
        ],
      },
      {
        path: "logout",
        element: <Login />,
      },
      {
        path: "downloads/*", // catch-all for file downloads
        element: <></>, // optional, you can remove this since the backend serves the file
      },
    ],
  },
]);

export default routes;
