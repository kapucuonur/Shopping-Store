import { Navigate, Outlet } from "react-router-dom";
import { useLoginContext } from "../context/LoginProvider";
import Navbar from "../components/Navbar";

const PrivateRouter = () => {
  const { user } = useLoginContext();

  return user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRouter;
