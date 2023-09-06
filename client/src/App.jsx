import "./App.css";
import { Routes, Route } from "react-router-dom";
import ActivitiesComponent from "./components/Activities";
import RoutinesComponent from "./components/Routines";

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
