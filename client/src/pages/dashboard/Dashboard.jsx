import { Link } from "react-router-dom";
import ActivitiesComponent from "./Activities";
import RoutinesComponent from "./Routines";
import LogoutComponent from "./Logout";

const DashboardComponent = () => {
  return (
    <>
      <Link to="/activities">exercises</Link>
      <Link to="/routines">routines</Link>
      <Link to="/myroutines">my routines</Link>
      <LogoutComponent />
    </>
  );
};
export default DashboardComponent;
