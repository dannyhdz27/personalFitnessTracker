import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { loginUser, registerUser } from "../../api/user";
import { useNavigate, Link, useLocation } from "react-router-dom";

const WelcomeComponent = () => {
  const { pathname } = useLocation();
  const isRegister = pathname === "/register";
  const { setLoggedIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result;
      if (isRegister) {
        result = await registerUser(username, password);
      } else {
        result = await loginUser(username, password);
      }
      console.log("Result after login or register: ", result);
      if (result.success) {
        setLoggedIn(true);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.message);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <h2>{isRegister ? "Register" : "Log In"}</h2>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <input
          required
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          required
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegister ? "Register" : "Log In"}</button>
        <p>
          {isRegister ? "Already have an account?" : "Need an account?"}{" "}
          <Link to={isRegister ? "/login" : "/register"}>
            {isRegister ? "Log In" : "Register"}
          </Link>
        </p>
      </form>
    </>
  );
};

export default WelcomeComponent;
