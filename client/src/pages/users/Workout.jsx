import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {getWorkoutById, reset} from '../../features/workout/workoutSlice'
import {applyWorkout} from '../../features/workout/workoutSlice'
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
    coverLetter: '',
  })

  const {coverLetter} = formData

  const {singleWorkout, isLoading, isError, isSuccess, workoutMessage} = useSelector((state) => state.workout)

  const { workoutName, category, description, duration, difficulty, tags, imageLink, equipments, workoutSchedule, createdAt } = singleWorkout


  

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

      const applyData = {
        coverLetter
    }
    dispatch(applyWorkout({workoutId: id, applyData})) 
    setShowModal(false);
    setShowConfirmationModal(true);
    }

    useEffect(() => {
      console.log(user);
      dispatch(getWorkoutById(id));
    
      return () => {
        dispatch(reset());
      };
    }, [dispatch, getWorkoutById, id, user]);

    useEffect(() => {
      if (isError) {
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
			
	 <div className='row gx-5 mx-1'>
		  <div className='col-md-12 border-b workout-d mb-4 p-4 inside'>
		  <div className='inside'>
		  <h2 className='mb-4 text-3xl font-semibold'>{workoutName}</h2>
		
			  <p className='mb-3 mt-3 font-semi
			  '>{category}</p>
			  
			 
  
			  <p className='bigger mt-2 mb-2'>{" "} {tags}</p>
  
			  <div>
	<div class="row">
	  <div class="col-12 col-md-4 mb-3 mb-md-0">
		<p class="bigger"><p> {duration}</p></p>
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
	  <Modal.Title>Internship Application To {workoutName}</Modal.Title>
	</Modal.Header>
	<Modal.Body>
	  <Form onSubmit={onSubmit}>
		<Form.Group controlId="formTextArea">
		  <b className='pinkish mb-4'>Write A Cover Letter</b>
		  <textarea
			type='text'
			placeholder='A convincing statement to get you hired by the company'
			name='coverLetter'
			value={coverLetter}
			onChange={onChange}
			className="form-control mb-4 mt-4"
			rows={10}
			required
		  />
		</Form.Group>
		{user ? (
		  <Button
			type='submit'
			className='normal-btn mb-4'
			aria-disabled={false}
			variant='danger'
		  >
			Submit
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
	  <Button variant="secondary" onClick={handleCloseModal}>
		Cancel
	  </Button>
	</Modal.Footer>
  </Modal>
  
  <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
		  <Modal.Header closeButton>
			<Modal.Title>Application to {workoutName} successful</Modal.Title>
		  </Modal.Header>
		  <Modal.Body>Your application has been sent, track the progress of your application in your dashboard, click the button to go there dash
		  <Link to='/user/dashboard' >
		  <Button
			type='submit'
			className=' mt-4 w-100'
			aria-disabled={false}
			variant='danger'
		  >
			Go To Dashboard
		  </Button>
		  </Link>
		  
		  
		  </Modal.Body>
		 
		  <Modal.Footer>
	  <Button variant="secondary" onClick={handleCloseModal}>
		Close
	  </Button>
	</Modal.Footer>
		</Modal>
  
  
  
	   
  
		</div>
	</div>
	</div>
	
  )
}

export default Workout