import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return {
    user: context.user,
    username: context.user.username,
    loggedIn: context.loggedIn,
    setLoggedIn: context.setLoggedIn,
  };
};

export default useAuth;
