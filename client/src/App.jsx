import "./App.css";
import { Routes, Route } from "react-router-dom";
import RoutinesComponent from "./pages/dashboard/Routines";
import ActivitiesComponent from "./pages/dashboard/Activities";
import LoginFormComponent from "./pages/welcome/LoginForm";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/activities" element={<ActivitiesComponent />} />
        <Route path="/routines" element={<RoutinesComponent />} />
        <Route path="/" element={<LoginFormComponent />} />
      </Routes>
    </div>
  );
}

export default App;
