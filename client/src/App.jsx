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
       </Routes>
      </div>
    </Router>
    <ToastContainer/>  
    </>
  );
}

export default App;
