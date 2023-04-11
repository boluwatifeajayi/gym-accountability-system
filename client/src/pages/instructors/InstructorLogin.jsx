import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate, Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../../components/Header'
import {loginInstructor, instructorreset} from '../../features/instructor/instructorAuthSlice'



function InstructorLogin() {
  const [formData, setFormData] = useState({
        
          instructorEmail: '',
          instructorPassword: '',
  })

const {
    instructorEmail,
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
		instructorEmail,
		password,
    }
    
    dispatch(loginInstructor(instructorData))
    
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
      <h3 className='text-2xl mb-1'><b>Welcome Back</b></h3>
      <p className='mb-4'>Please Login to continue</p>
        
        <form className='form' onSubmit={onSubmit}>
        
             
             
			  
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
				{isLoading ? 'Loading...' : 'login'}
              </b> 
          </button>
         
        </form>

        <span>Don't have an account? </span>
        <Link
          to="/instructor/register"
          className="secondary"
          style={{ textDecoration: 'none' }}
        >
          Register
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

export default InstructorLogin
