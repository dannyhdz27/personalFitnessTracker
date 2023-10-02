import "./App.css";
import { Routes, Route } from "react-router-dom";
import RoutinesComponent from "./pages/dashboard/Routines";
import ActivitiesComponent from "./pages/dashboard/Activities";

import WelcomeComponent from "./pages/welcome/Welcome";

import MyRoutinesComponent from "./pages/dashboard/MyRoutines";
import DashboardComponent from "./pages/dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomeComponent />} />
        <Route path="/register" element={<WelcomeComponent />} />
        <Route path="/login" element={<WelcomeComponent />} />
        <Route path="/dashboard" element={<DashboardComponent />} />
        <Route path="/activities" element={<ActivitiesComponent />} />
        <Route path="/routines" element={<RoutinesComponent />} />
        <Route path="/myroutines" element={<MyRoutinesComponent />} />
      </Routes>
    </div>
  );
}

export default App;
