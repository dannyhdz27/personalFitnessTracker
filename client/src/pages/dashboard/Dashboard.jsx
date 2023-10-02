import { Link } from "react-router-dom";
import ActivitiesComponent from "./Activities";
import RoutinesComponent from "./Routines";

const DashboardComponent = () => {
  return (
    <>
      <Link to="/activities">exercises</Link>
      <Link to="/routines">routines</Link>
      <Link to="/myroutines">my routines</Link>
    </>
  );
};
export default DashboardComponent;
