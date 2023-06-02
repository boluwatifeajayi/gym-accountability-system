import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/static/Home'
import Login from './pages/users/Login'
import Register from './pages/users/Register'
import InstructorRegister from './pages/instructors/InstructorRegister'
import InstructorLogin from './pages/instructors/InstructorLogin';
import InstructorDashboard from './pages/instructors/InstructorDashboard';
import CreateWorkout from './pages/instructors/CreateWorkout';
import CreateDiet from './pages/instructors/CreateDiet';
import Workout from './pages/users/Workout';
import Diet from './pages/users/Diet';
import InstructorWorkout from './pages/instructors/InstructorWorkout';
import InstructorDiet from './pages/instructors/instructorDiet';
import AllWorkouts from './pages/users/AllWorkouts';
import AllDiets from './pages/users/AllDiets';
import UpdateWorkout from './pages/instructors/UpdateWorkout';
import UpdateDiet from './pages/instructors/UpdateDiet';
import UserDashboard from './pages/users/UserDashboard';
import CreateGoal from './pages/users/CreateGoal';
import CreateTask from './pages/users/CreateTask';
import GetGoals from './pages/users/GetGoals';
import AppliedDiets from './pages/users/AppliedDiets';
import Analytics from './pages/users/Anayltics';
import Help from './pages/users/Help';
import Accountable from './pages/users/Accountable';
import InstructorList from './pages/instructors/InstructorList';
import InstructorDetails from './pages/instructors/InstructorDetails';


function App() {
  return (
    <>
    <Router>
      <div>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/user/login' element={<Login/>}/>
        <Route path='/user/register' element={<Register/>}/>
        <Route path='/instructor/register' element={<InstructorRegister/>}/>
        <Route path='/instructor/login' element={<InstructorLogin/>}/>
        <Route path='/instructor/dashboard' element={<InstructorDashboard/>}/>
        <Route path='/instructor/create' element={<CreateWorkout/>}/>
        <Route path='/instructor/create/diet' element={<CreateDiet/>}/>
        <Route path='/instructor/workout/:id' element={<InstructorWorkout/>}/>
        <Route path='/instructor/diet/:id' element={<InstructorDiet/>}/>
        <Route path='/workouts' element={<AllWorkouts/>}/>
        <Route path='/diets' element={<AllDiets/>}/>
        <Route path='/workout/:id' element={<Workout/>}/>
        <Route path='/diet/:id' element={<Diet/>}/>
        <Route path='/workout/update/:id' element={<UpdateWorkout/>}/>
        <Route path='/diet/update/:id' element={<UpdateDiet/>}/>
        <Route path='/user/dashboard' element={<UserDashboard/>}/>
        <Route path='/goals' element={<GetGoals/>}/>
        <Route path='/create-goal' element={<CreateGoal/>}/>
        <Route path='/user/add-task' element={<CreateTask/>}/>
        <Route path='/joined-diets' element={<AppliedDiets/>}/>
        <Route path='/analytics' element={<Analytics/>}/>
        <Route path='/help' element={<Help/>}/>
        <Route path='/accountable/:id' element={<Accountable/>}/>
        <Route path='/instructors' element={<InstructorList/>}/>
        <Route path='/instructor/:id' element={<InstructorDetails/>}/>
        
        
       </Routes>
      </div>
    </Router>
    <ToastContainer/>  
    </>
  );
}

export default App;
