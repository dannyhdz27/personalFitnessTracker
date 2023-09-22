import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { registerUser } from "../../api/user";
import { useNavigate, Link } from "react-router-dom";

const RegisterFormComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setLoggedIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform login logic, e.g., call an API

    try {
      let result = await registerUser(username, password);
      if (result.success) {
        setLoggedIn(true);

        console.log("Auth Results", result);
        // navigate("/dashboard");
      }
    } catch (error) {
      setError(error.message);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Sign up</button>
      <p>
        Already a user? <Link to="/login">Sign in</Link>
      </p>
    </form>
  );
};

export default RegisterFormComponent;
