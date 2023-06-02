import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../components/Header';
import { getInstructorWorkouts } from '../../features/workout/workoutSlice';
import { getInstructorDiets } from '../../features/diet/dietSlice';
import { reset } from '../../features/workout/workoutSlice';

function InstructorDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { workouts, isLoading: workoutLoading, isError: workoutError, workoutMessage } = useSelector((state) => state.workout);
  const { diets, isLoading: dietLoading, isError: dietError } = useSelector((state) => state.diet);

  useEffect(() => {
    if (workoutError) {
      console.log(workoutMessage);
    }

    dispatch(getInstructorWorkouts());
    dispatch(getInstructorDiets());

    return () => {
      dispatch(reset());
    };
  }, []);

  if (workoutLoading || dietLoading) {
    return (
      <h1 className='loading'>
        Loading...
      </h1>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-40 mt-8 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-semibold">Posted Workouts</h1>
          <Link to="/instructor/create">
            <button className="px-4 py-2 text-white bg-red-500 rounded">Create New Workout +</button>
          </Link>
          <Link to="/instructor/create/diet">
            <button className="px-4 py-2 text-white bg-red-500 rounded">Create New Diet +</button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {workouts?.length > 0 ? (
            workouts.map((workout, index) => (
              <div key={index} className="bg-white p-4 rounded shadow-md mt-4">
                <h2 className="text-xl font-semibold mb-2">{workout.workoutName}</h2>
                <p className="text-gray-500 mb-4">{workout.category}</p>
                <Link to={`/instructor/workout/${workout._id}`}>
                  <button className="px-3 py-1 text-white bg-red-500 rounded">Learn More</button>
                </Link>  
              </div>
            ))
          ) : (
            <p className='text-left'>You haven't Posted Any Workouts...Click Create New Workout To Get Started </p>
          )}
        </div>
       
        <h1 className="text-xl font-semibold mt-4">Posted Diets</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {diets?.length > 0 ? (
            diets.map((diet, index) => (
              <div key={index} className="bg-white p-4 rounded shadow-md mt-4">
                <h2 className="text-xl font-semibold mb-2">{diet.dietName}</h2>
                <p className="text-gray-500 mb-4">{diet.category}</p>
                <Link to={`/instructor/diet/${diet._id}`}>
                  <button className="px-3 py-1 text-white bg-red-500 rounded">Learn More</button>
                </Link>  
              </div>
            ))
          ) : (
            <p className='text-left'>You haven't Posted Any diets...Click Create New diet To Get Started </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default InstructorDashboard;
