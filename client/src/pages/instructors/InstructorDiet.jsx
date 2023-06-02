import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {getDietById, reset, deleteDiet} from '../../features/diet/dietSlice'

import { Button, Modal, Form } from 'react-bootstrap';
import Header from '../../components/Header';

function InstructorDiet() {
  
	const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams();
    const [status, setStatus] = useState([]);
    const [showb, setshowb] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);


	const {singleDiet, isLoading, isError, isSuccess, dietMessage} = useSelector((state) => state.diet)

	const { dietName, category, description, duration, difficulty, tags, imageLink, equipments, dietSchedule } = singleDiet
 
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this diet?')) {
      try {
        await dispatch(deleteDiet(id));
        // Reload the page after successful deletion
        alert("Diet Deleted")
        navigate('/employer/internships');
      } catch (error) {
        console.error('Error deleting diet:', error);
        // Alert an error if there was an error
        alert('Error deleting diet');
      }
    }
  };
  
	useEffect(() => {
    if (isError && dietMessage) {
      console.log(dietMessage);
    } 
  
    dispatch(getDietById(id));
    
    return () => {
      dispatch(reset());
    };
  }, [dispatch, id, isError, dietMessage]);

  if(isLoading){
    return <h1 className='loading'>
   Loading...
  </h1>
  }
  
  
  return (

	<div>
		<Header/>
		<div className='container2'>
    <Link to="/instructor/dashboard">
      <button className='btn btn-block  mt-4 mb-4 w-25' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back To diets</button>
      </Link>
          
   <div className='row gx-5 mx-1'>
        <div className='col-md-7 border-b diet-d mb-4'>
       
        <h2 className='mt-4 text-2xl'>{dietName}</h2>
            
             <b className='pinkish bigger'>Category</b>
            <p>{category}</p>
            <b className='pinkish bigger'>Responsibilities</b>
            <div dangerouslySetInnerHTML={{ __html: description?.slice(0, 200)  }} />
			<b className='pinkish bigger'>Duration</b>
            <div dangerouslySetInnerHTML={{ __html: duration?.slice(0, 200)  }} />
            
            <b className='pinkish bigger'>Difficulty</b>
            <div dangerouslySetInnerHTML={{ __html: difficulty?.slice(0, 200)  }} />
			<b className='pinkish bigger'>Diet</b>
            <div dangerouslySetInnerHTML={{ __html: dietSchedule?.slice(0, 200)  }} />


           <div>
       <Link to={`/diet/update/${id}`}> <button className='btn btn-secondary'>Update Diet</button></Link>    
            <button className='btn btn-danger ml-2' onClick={handleDelete}>Delete Diet</button>
            
            </div>

        </div>
        <div className='col-md-0 '>
        </div>
		<div className='col-md-4 apply'>
			{/* <h3>Applications</h3> */}
      {/* {showb ?  <button onClick={viewStudents} className="btn normal-btn mt-4 mb-4">View Student Applications</button> : ""}
     
      
      {status.map((student) => (
        <div key={student.studentId}>
          <b>Status</b>
          <p>{student.status}</p>

          <b>Cover Letter</b>
          <p>{student.coverLetter}</p>
          <Link to={`/employer/application/${student.studentId}`}>
            <button className='normal-btn'>
              More About This student 
            </button>
          </Link>
                 
      <button
        className="btn btn-primary mt-4 mb-4 mr-3"
        onClick={() => {
          dispatch(acceptStudent({ studentId: student.studentId, dietId: id }));
          setTimeout(() => {
            setShowModal(true);
            
          }, 2000);
        }}
      >
        Accept
      </button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Successfully Accpeted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Send this student a custom email now
          <Link to='/student/dashboard' >
            <Button
              type='submit'
              className=' mt-4 w-100'
              aria-disabled={false}
              variant='success'
            >
             Send Email
            </Button>
          </Link>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    
           
            <button className="btn btn-danger mt-4 mb-4" onClick={() => dispatch(declineStudent({studentId: student.studentId, dietId: id}))}>Decline</button>
            <hr/>
        </div>
      ))} 
     */}
        </div>
       
    </div>
  </div>
	</div>

	
  )
}

export default InstructorDiet