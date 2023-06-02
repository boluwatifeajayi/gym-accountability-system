import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate, Link} from 'react-router-dom'
import { toast } from 'react-toastify'
import {login, reset} from '../../features/userAuth/userAuthSlice'
import './users.css'
import Header from '../../components/Header'


function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state => state.userauth)) 

  useEffect (() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate('/workouts')
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
        email,
        password
      }

      dispatch(login(userData))
    }
  

  if(isLoading){
    return <h1 className='text-center my-24'>Loading....</h1>
  }


  

  return (
    <>
<Header/>
<div className="flex flex-col justify-center items-center">
  <div className="container mx-auto px-4 py-12 md:py-24">
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="py-4 px-6">
        <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>
        <p className="text-gray-600 mb-8">Please login to your account to continue</p>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={onChange}
              value={email}
              className="py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
              placeholder="example@example.com"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              placeholder="••••••••"
              onChange={onChange}
              className="py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500"
              required
              minLength="6"
            />
          </div>

          <button className="bg-red-500 text-white py-2 px-4 rounded-lg font-medium tracking-wide shadow-lg hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full">
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <div className="flex justify-between items-center mt-4">
          <span>Don't have an account?</span>
          <Link
            to="/user/register"
            className="text-red-500 font-medium hover:underline transition-colors duration-200"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>

  </>
  )
}

export default Login
