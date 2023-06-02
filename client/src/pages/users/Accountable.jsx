import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {getWorkoutById, reset} from '../../features/workout/workoutSlice'
import {applyWorkout} from '../../features/workout/workoutSlice'
import { commentToWorkout } from '../../features/workout/workoutSlice'
import { Button, Modal, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'


function Accountable() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams();
  const [companyInfo, setCompanyInfo] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [seeComp, setSeeComp] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
 
  const {user} = useSelector((state) => state.userauth) 

  const [formData, setFormData] = useState({
    comments: '',
  })

  const {comments} = formData

  const {singleWorkout, isLoading, isError, isSuccess, workoutMessage} = useSelector((state) => state.workout)

  const { workoutName, category, description, duration, difficulty, tags, imageLink, noOfDays, equipments, workoutSchedule, userComments, createdAt } = singleWorkout


  

  function showCompanyInfo(){
    setCompanyEmail(org.orgEmail)
    setCompanyInfo(org.orgDescription)
    setSeeComp(true)
  }

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseConfirmationModal = () => setShowConfirmationModal(false);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
	e.preventDefault();
  
	const commentData = {
	  comments: 'yeahh',
	};
  
	dispatch(commentToWorkout({ workoutId: id, commentData }))
	  .then(() => {
		setShowModal(false);
		setShowConfirmationModal(true);
	  })
	  .catch((error) => {
		alert('You have already joined this workout');
		console.log(error);
	  });
  };
  
  // ...
  
  useEffect(() => {
	console.log(user);
	dispatch(getWorkoutById(id));
  
	return () => {
	  dispatch(reset());
	};
  }, [dispatch, getWorkoutById, id, user]);
  
  useEffect(() => {
	if (isError) {
	  alert('You have already joined this workout');
	  console.log(workoutMessage);
	}
  }, [isError, workoutMessage]);


  const timeDiff = moment(createdAt).fromNow();

  



  if(isLoading){
    return <h1 className='loading'>
   Loading...
  </h1>
  }


  

  return (
	<div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className=" px-10 mt-8 mb-16">
          <div className="mx-1">
            <div className="col-md-12 workout-d mb-4 p-4">
              <div>{/* Help content */}</div>
            </div>
          </div>
          <h2 className="mb-4 text-xl font-semibold mt-6">{workoutName}</h2>
          <div className=" p-4  mt-4">
            <h3 className="text-xl font-bold mb-4">Accountable Partners</h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {userComments?.length === 0 ? (
                <p className="text-gray-500">No users joined yet. Be the first to join!</p>
              ) : (
                userComments?.map((comment) => (
                  <div key={comment._id} className="bg-white p-4 shadow-md rounded">
                    <p>
                      <span className="font-medium">Name: </span>
                      {comment.firstname} {comment.lastname}
                    </p>

                   
                      <p>
                        <span className="font-medium">age: </span>
                        {comment.age}
                      </p>
                      <p>
                        <span className="font-medium">Weight: </span>
                        {comment.weight}kg
                      </p>
                   
                   
                  
                    <p>
                      <span className="font-medium">Progress: </span>
                      {comment.progress}%
                    </p>
                    <p>
                      <span className="font-medium">Joined: </span>
                      {moment(comment.appliedAt).fromNow()}
                    </p>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mt-3"
                      onClick={() => (window.location.href = `mailto:${comment.email}`)}
                    >
                      Get In Touch
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
	
  )
}

export default Accountable