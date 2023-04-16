import {React, useEffect} from 'react'
import Header from '../../components/Header';
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {getInstructorWorkouts,} from '../../features/workout/workoutSlice'
import { reset } from '../../features/workout/workoutSlice';

function InstructorDashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {workouts, isLoading, isError, isSuccess, workoutMessage} = useSelector((state) => state.workout)

  useEffect(() => {

    if (isError) {
      console.log(workoutMessage)
    } 

   
    dispatch(getInstructorWorkouts())
  

    return () => {
      dispatch(reset())
    }
  }, [])

  if(isLoading){
    return <h1 className='loading'>
    Loading...
  </h1>
  }

  return (
    <div>
    <Header />
    <div className="container mx-auto px-40 mt-8 mb-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Posted Workouts</h1>
        <Link to="/instructor/create">
          <button className="px-4 py-2 text-white bg-blue-500 rounded">Create New Workout +</button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {workouts.length > 0 ? (
          workouts.map((workout, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md mt-4">
              <h2 className="text-xl font-semibold mb-2">{workout.workoutName}</h2>
              <p className="text-gray-500 mb-4">{workout.category}</p>
              <Link to={`/instructor/workout/${workout._id}`}>
               <button className="px-3 py-1 text-white bg-blue-500 rounded">Learn More</button>
              </Link>  
            </div>
          ))
        ) : (
          <p className='text-center'>You haven't Posted Any Workouts...Click Create New Workout To Get Started </p>
        )}
      </div>
    </div>
  </div>
  
  
  );
}

export default InstructorDashboard;
