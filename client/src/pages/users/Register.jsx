import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate, Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import {register, reset} from '../../features/userAuth/userAuthSlice'
import Header from '../../components/Header'




function Register() {
  const [formData, setFormData] = useState({
    firstname: '',
	lastname: '',
    email: '',
	age: '',
	weight: '',
	height: '',
	gender: '',
	place: '',
	focus: '',
    password: '',
   
  })

  const { firstname, lastname, email, age, height, weight, gender, place, focus, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state => state.userauth)) 

  useEffect (() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate('/user/stations')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    
    
      const userData = {
		firstname,
		lastname,
		email,
		age,
		weight,
		height,
		gender,
		place,
		focus,
		password,
      }

      dispatch(register(userData))
    }

  

  if(isLoading){
    return <h1 className='loading'>Loading....</h1>
  }

  

  return (
    <>
    <Header/>
      <div className='container reg'>
      <div className='rowi'>
        <div>
        <div className="reg-container">
      <div className="reg-wrapper">
      <h1><b>Create An Account</b></h1>
          <p className='mt-4 mb-4'>Please Create An account to get started</p>
         
         
       

        <form className='form' onSubmit={onSubmit}>
        <div className='row'>
              <div className='col'>
              <div className="form-group">
                <input
                  id="name"
                  type="text"
                  name="firstname"
                  placeholder='First Name'
                  onChange={onChange}
                  className="form-input"
                  style={{paddingLeft: 15,}}
                  value={firstname}
                  required
                />
              </div>
              </div>
              <div className='col'>
              <div className="form-group">
                <input
                  id="name"
                  type="text"
                  name="lastname"
                  onChange={onChange}
                  value={lastname}
                  style={{paddingLeft: 15,}}
                  placeholder="Last Name"
                  className="form-input"
                  required
                />
             </div>
              </div>
            </div>

            <div className="form-group">
            
            <input
              id="email"
              type="email"
              name="email"
              onChange={onChange}
              value={email}
              style={{paddingLeft: 15,}}
              className="form-input"
              placeholder="Email"
              required
            />
          </div>

		  <div className='row'>
              <div className='col'>
              <div className="form-group">
                <input
                  id="name"
                  type="text"
                  name="age"
                  placeholder='age'
                  onChange={onChange}
                  className="form-input"
                  style={{paddingLeft: 15,}}
                  value={age}
                  required
                />
              </div>
              </div>
              <div className='col'>
              <div className="form-group">
                <input
                  id="name"
                  type="text"
                  name="gender"
                  onChange={onChange}
                  value={gender}
                  style={{paddingLeft: 15,}}
                  placeholder="Gender"
                  className="form-input"
                  required
                />
             </div>
              </div>
            </div>

          
          
          <div className="form-group">
           
          <input
              type='text'
              className='form-control'
              id='matricNumber'
              name='weight'
              value={weight}
              placeholder='Weight in Kg'
              onChange={onChange}
            
            />
		
          </div>
          <div className="form-group">
          <input
              type='text'
              className='form-control'
              id='program'
              name='height'
              value={height}
              placeholder='Height'
              onChange={onChange}
            
            />
          </div>
          
          <div className="form-group">
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              style={{paddingLeft: 15,}}
              onChange={onChange}
              className="form-input"
              required
              minLength="6"
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
          to="/user/login"
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

export default Register
