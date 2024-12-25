import { useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Outlet } from "react-router-dom";

function App() {
  const { globalLoading } = useSelector((store) => store.loading);
  
  if (globalLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
