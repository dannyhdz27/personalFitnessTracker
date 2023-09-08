import "./App.css";
import { Routes, Route } from "react-router-dom";
import RoutinesComponent from "./pages/dashboard/Routines";
import ActivitiesComponent from "./pages/dashboard/Activities";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/activities" element={<ActivitiesComponent />} />
        <Route path="/routines" element={<RoutinesComponent />} />
      </Routes>
    </div>
  );
}

export default App;
