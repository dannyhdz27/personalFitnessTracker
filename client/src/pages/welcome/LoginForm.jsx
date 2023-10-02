// import { useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import { loginUser } from "../../api/user";
// import { useNavigate, Link } from "react-router-dom";

// const LoginFormComponent = () => {
//   const navigate = useNavigate();
//   const { setLoggedIn } = useAuth();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const result = await loginUser(username, password);
//       console.log("result", result);
//       if (result.success) {
//         setLoggedIn(true);

//         navigate("/dashboard");
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//     setUsername("");
//     setPassword("");
//   };

//   return (
//     <>
//       <h2>LOGIN</h2>
//       <form onSubmit={handleSubmit}>
//         {error && <p>{error}</p>}
//         <input
//           required
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           // onChange={updateUsername}
//         />
//         <input
//           required
//           type="password"
//           name="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Log In</button>
//         <p>
//           Need an account? <Link to="/register">Register</Link>
//         </p>
//       </form>
//     </>
//   );
// };

// export default LoginFormComponent;
