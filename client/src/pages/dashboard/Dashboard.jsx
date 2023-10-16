import { Link } from "react-router-dom";
import ActivitiesComponent from "./Activities";
import RoutinesComponent from "./Routines";
import LogoutComponent from "./Logout";

const DashboardComponent = () => {
  return (
    <>
      <div className="button-container">
        <Link to="/activities" className="link-button">
          exercises
        </Link>
        <Link to="/routines" className="link-button">
          routines
        </Link>
        <Link to="/myroutines" className="link-button">
          my routines
        </Link>
        <LogoutComponent />
      </div>
    </>
  );
};

export default DashboardComponent;
