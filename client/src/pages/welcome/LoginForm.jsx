import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { loginUser } from "../../api/user";

const LoginFormComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform login logic, e.g., call an API

    try {
      const result = await loginUser(username, password);
      if (result.success) {
        setLoggedIn(true);

        console.log("Auth Results", result);
      }
    } catch (error) {}
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginFormComponent;
