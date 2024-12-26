import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"; // For redirection to Login

const ProtectedRoute = ({ children }) => {
  // Access the isAuthenticated state from the Redux store
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    // If not authenticated, redirect to Login page
    return <Navigate to="/" />;
  }

  // If authenticated, render the child components
  return children;
};

export default ProtectedRoute;
