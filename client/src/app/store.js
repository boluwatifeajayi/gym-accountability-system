import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from '../features/userAuth/userAuthSlice';
import instructorAuthReducer from '../features/instructor/instructorAuthSlice'
import workoutReducer from '../features/workout/workoutSlice'



export const store = configureStore({
  reducer: {
    userauth: userAuthReducer,
    instructorauth: instructorAuthReducer,
    workout: workoutReducer
  },
});
