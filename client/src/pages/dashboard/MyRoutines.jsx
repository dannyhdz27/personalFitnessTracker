import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { getUserRoutines } from "../../api/user";
import { useNavigate } from "react-router-dom";

const MyRoutinesComponent = () => {
  const { username, user, loggedIn } = useAuth();
  // const [user, setUser] = useState(useAuth());
  const navigate = useNavigate();
  console.log("user:", user);

  const [myRoutines, setMyRoutines] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      async function getRoutinesbyUser() {
        // setUser(user);
        try {
          const response = await getUserRoutines(username);
          console.log("user:", user);

          console.log("API Response:", response);
          setMyRoutines(response);
        } catch (error) {
          console.error("API Request Error:", error);
        }
      }
      getRoutinesbyUser();
    } else {
      // If not logged in, reset myRoutines to an empty array
      setMyRoutines([]);
    }

    console.log("myRoutines:", myRoutines);
  }, [loggedIn, user]);

  const handleNavigateToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <h1> Welcome to your Profile {user.username}</h1>
      <h2> my routines</h2>
      <div>
        {myRoutines.length === 0 ? (
          <p className="no-routines-message">
            You don't have any routines yet!
          </p>
        ) : (
          myRoutines.map((routine, idx) => (
            <div key={idx} className="routine-container">
              <p className="routine-name">Routine: {routine.name}</p>
              {routine.activities.map((activity, activityIdx) => (
                <div key={activityIdx} className="activity-card">
                  <p className="activity-name">
                    Activity Name: {activity.name}
                  </p>
                  <p className="activity-description">
                    Description: {activity.description}
                  </p>
                  <p className="activity-reps">Reps: {activity.reps}</p>
                  <p className="activity-sets">Sets: {activity.sets}</p>
                  <p className="activity-weight">Weight: {activity.weight}</p>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      <button onClick={handleNavigateToDashboard}>Dashboard</button>
      <button>Create a Routine</button>
    </>
  );
};
export default MyRoutinesComponent;
