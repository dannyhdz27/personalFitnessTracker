import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { getUserRoutines } from "../../api/user";

const MyRoutinesComponent = () => {
  const [user, setUser] = useState(useAuth());
  console.log("user:", user);

  const [myRoutines, setMyRoutines] = useState([]);

  useEffect(() => {
    async function getRoutinesbyUser() {
      setUser(user);
      try {
        const response = await getUserRoutines(user);
        console.log("user:", user);

        console.log("API Response:", response);
        setMyRoutines(response);
      } catch (error) {
        console.error("API Request Error:", error);
      }
    }
    getRoutinesbyUser();
    console.log("myRoutines:", myRoutines);
  }, [user]);

  return (
    <>
      <h1> Welcome to your Profile {user.username}</h1>
      <h2> my routines</h2>
      <div>
        {myRoutines.length === 0 ? (
          <p>You don't have any routines yet!</p>
        ) : (
          myRoutines.map((routine, idx) => (
            <div key={idx} className="routinecard">
              <p>Routine:{routine.name}</p>
              <p>{routine.notes}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};
export default MyRoutinesComponent;
