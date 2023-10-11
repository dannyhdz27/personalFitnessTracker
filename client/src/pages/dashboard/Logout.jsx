import { logout } from "../../api/user";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LogoutComponent = () => {
  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      setLoggedIn(false);
      navigate("/");
      console.log("successdully logged out!");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutComponent;
