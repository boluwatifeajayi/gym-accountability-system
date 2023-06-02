import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate, Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../../components/Header'
import {registerInstructor, instructorreset} from '../../features/instructor/instructorAuthSlice'



function InstructorRegister() {
  const [formData, setFormData] = useState({
    instructorFirstname: '',
	instructorLastname: '',
    instructorEmail: '',
	instructorBio: '',
    instructorPassword: '',
  })

const {
	instructorFirstname,
	instructorLastname,
    instructorEmail,
	instructorBio,
    password,
} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {instructor, isLoading, isError, isSuccess, message} = useSelector((state => state.instructorauth)) 

  useEffect (() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || instructor){
      navigate('/instructor/dashboard')
    }

    dispatch(instructorreset())
  }, [instructor, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  

  const onSubmit = (e) => {
    e.preventDefault()

   
    const instructorData = {
		instructorFirstname,
		instructorLastname,
		instructorEmail,
		instructorBio,
		password,
    }
    
    dispatch(registerInstructor(instructorData))
    
    }

  

  if(isLoading){
    return <h2>Loading...</h2>
  }

  

  return (
    <>  
    <Header/>
      <div className='container reg'>
      <div className='rowi'>
       
        <div>
        <div className="reg-container">
      <div className="reg-wrapper">
      <h2 className='text-2xl mb-4'><b>Create Instructor Account</b></h2>
         
      
       

        <form className='form' onSubmit={onSubmit}>
        
            
             
             
			  <div className='row'>
              <div className='col'>
              <div className="form-group">
                <input
                  id="name"
                  type="text"
                  name="instructorFirstname"
                  placeholder='first name'
                  onChange={onChange}
                  className="form-control"
                  style={{paddingLeft: 15,}}
                  value={instructorFirstname}
                  required
                />
              </div>
              </div>
              <div className='col'>
              <div className="form-group">
                <input
                  id="name"
                  type="text"
                  name="instructorLastname"
                  onChange={onChange}
                  value={instructorLastname}
                  style={{paddingLeft: 15,}}
                  placeholder="Last name"
                  className="form-control"
                  required
                />
             </div>
              </div>
            </div>

              <div className="form-group">
            
            <input
                    type='instructorEmail'
                    className='form-control'
                    id='instructorEmail'
                    name='instructorEmail'
                    value={instructorEmail}
                    placeholder='Enter your instructor email'
                    onChange={onChange}
                  />
                </div>

                
             
              <div className="form-group">
              <textarea
              type='text'
              className='form-control'
              id='instructorBio'
              name='instructorBio'
              value={instructorBio}
              placeholder='Enter Bio and available times for sessions'
              onChange={onChange}
            
            ></textarea>
             </div>

        
          
        <div className="form-group">
          <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter Password'
              onChange={onChange}
            />
          </div>
          
          <button className="normal-btn mt-2 mb-4">
              <b>
				{isLoading ? 'Loading...' : 'Register'}
              </b> 
          </button>
         
        </form>

        <span>Already have an account? </span>
        <Link
          to="/instructor/login"
          className="secondary"
          style={{ textDecoration: 'none' }}
        >
          Login
        </Link>
        <br/>
        
      </div>
    </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default InstructorRegister
