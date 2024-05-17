import { useContext } from "react";
import { UserContext } from "./UserContextProvider";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center text-3xl">
        loading...
      </div>
    );
  }

  if (!user?.id) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
