import "./App.css";
import { Routes, Route } from "react-router-dom";
import RoutinesComponent from "./pages/dashboard/Routines";
import ActivitiesComponent from "./pages/dashboard/Activities";
import LoginFormComponent from "./pages/welcome/LoginForm";
import WelcomeComponent from "./pages/welcome/Welcome";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomeComponent />} />
        <Route path="/activities" element={<ActivitiesComponent />} />
        <Route path="/routines" element={<RoutinesComponent />} />
        <Route path="/login" element={<LoginFormComponent />} />
      </Routes>
    </div>
  );
}

export default App;
