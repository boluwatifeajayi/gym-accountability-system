import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCommentedWorkouts, reset as resetWorkouts } from '../../features/workout/workoutSlice';
import { getCommentedDiets } from '../../features/diet/dietSlice';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

function UserDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { workouts, isLoading, isError, workoutMessage } = useSelector((state) => state.workout);
  const { diets } = useSelector((state) => state.diet);

  useEffect(() => {
    if (isError) {
      console.log(workoutMessage);
    }

    dispatch(getCommentedWorkouts()); // Fetch commented workouts only
    dispatch(getCommentedDiets());

    return () => {
      dispatch(resetWorkouts());
    };
  }, [dispatch, isError, workoutMessage]);

  if (isLoading) {
    return (
      <div className="text-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
       <Header />
       <div className="flex">
      <Sidebar username="John Doe" />
      <div className="flex-grow">
       
        <div className="mx-auto px-10 mt-8 mb-16">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold">Workouts You Joined</h1>
          </div>
          {workouts.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-800">Workout Name</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-800">Category</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-800">Duration</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-800">Difficulty</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="px-6 py-4">{workout.workoutName}</td>
                    <td className="px-6 py-4">{workout.category}</td>
                    <td className="px-6 py-4">{workout.duration && workout.duration.split(' ').slice(0, 10).join(' ')}...</td>
                    <td className="px-6 py-4">{workout.difficulty}</td>
                    <td className="px-6 py-4">
                      <Link to={`/accountable/${workout._id}`}>
                        <button className="px-3 py-1 text-white bg-red-500 rounded">Acct Partners</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">You haven't joined any workouts.</p>
          )}
          <hr />
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default UserDashboard;
