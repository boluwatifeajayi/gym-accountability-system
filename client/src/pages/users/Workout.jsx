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



function Workout() {
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
		<Header/>
		<div className='container mx-auto px-40 mt-8 mb-16'>
      

	  <Link to="/workouts">
		<button className='btn mt-4 mb-4 back-btn' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back To Workouts</button>
		</Link>
			
	 <div className='row gx-5 mx-1 bg-white p-4 rounded shadow-md mt-4'>
		  <div className='col-md-12 workout-d mb-4 p-4'>
		  <div className=''>
		  <img src={imageLink} alt="picture" className="rounded h-80" />

		  <h2 className='mb-4 text-3xl font-semibold mt-6'>{workoutName}</h2>
		
			  <p className='mb-3 mt-3 font-semi
			  '>{category}</p>
			  
			 
  
			 
  
			  <div>
	<div class="row">
	  <div class="col-12 col-md-4 mb-3 mb-md-0">
		<p class="bigger"><p> {noOfDays} days</p></p>
	  </div>
	  <div class="col-12 col-md-4 mb-3 mb-md-0">
		<p class="bigger"><p> {difficulty}</p></p>
	  </div>
	  <div class="col-12 col-md-4">
		<p class="bigger"><p>{equipments}</p></p>
	  </div>
	</div>
	<hr class="my-4"/>
	<div>
	  {description}
	</div>
	<hr class="my-4"/>
  </div>
  
			 
			  <div class="mt-3 mb-3">
				
				<div class="mb-3" dangerouslySetInnerHTML={{ __html: workoutSchedule }} />
  
			   
			</div>
  
			<Button  className='w-100 mt-4 normal-btn' onClick={handleShowModal}>
		  Join Now
		</Button>
		  </div>
		  <div className='col-md-0 '>
			 <p className='text-white'>......</p>
		  </div>
		  </div>
		  
		 
  
		  <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal" className='themod'>
	<Modal.Header closeButton>
	  <h3 className='text-2xl mb-4'>{workoutName}</h3>
	  
	</Modal.Header>
	<Modal.Body>
	<p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dicta expedita alias! Tempore dolorem magni laborum corporis ut qui molestias culpa nemo voluptatum dolorum veritatis eius autem reprehenderit, in enim!</p>
	  <Form onSubmit={onSubmit}>
		<Form.Group controlId="formTextArea">
		 
		  {/* <textarea
			type='text'
			placeholder='A convincing statement to get you hired by the company'
			name='comments'
			value={comments}
			onChange={onChange}
			className="form-control mb-4 mt-4"
			rows={10}
			required
		  /> */}
		</Form.Group>
		{user ? (
		  <Button
			type='submit'
			className='normal-btn mb-4'
			aria-disabled={false}
			variant='danger'
		  >
			Join Now
		  </Button>
		) : (
		  <center>
			<Link to='/user/register' className='secondary'>
			  Create Account To Apply
			</Link>
		  </center>
		)}
	  </Form>
	</Modal.Body>
	<Modal.Footer>
	 
	</Modal.Footer>
  </Modal>
  
  <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
		  <Modal.Header closeButton>
			<Modal.Title>Application to {workoutName} successful</Modal.Title>
		  </Modal.Header>
		  <Modal.Body>You can track the workout and other users in your dashboard
		  <Link to='/user/dashboard' >
		  <button
  type="submit"
  className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
>
  Go To Dashboard
</button>

		  </Link>
		  
		  
		  </Modal.Body>
		 
		  <Modal.Footer>
	  <Button variant="secondary" onClick={handleCloseModal}>
		Close
	  </Button>
	</Modal.Footer>
		</Modal>
  
  
  
	   
  
		</div>
		<div className="bg-white p-4 rounded shadow-md mt-4">
      <h3 className="text-xl font-bold mb-4">Users Following this workout</h3>
      <hr />
      {userComments?.length === 0 ? (
        <p className="text-gray-500">No users joined yet. Be the first to join!</p>
      ) : (
        userComments?.map((comment) => (
          <div key={comment._id}>
            <div className="mt-3 mb-3">
              <p>
                <span className="font-medium">Name: </span>
                {comment.firstname}
              </p>
              <p>
                <span className="font-medium">Email: </span>
                {comment.email}
              </p>
              <p>
                <span className="font-medium">Joined: </span>
                {comment.comments}
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
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-3"
                onClick={() => (window.location.href = `mailto:${comment.email}`)}
              >
                Message
              </button>
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
	</div>
	
	</div>
	
  )
}

export default Workout