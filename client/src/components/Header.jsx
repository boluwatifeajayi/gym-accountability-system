import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/userAuth/userAuthSlice';
import { logoutInstructor, instructorreset } from '../features/instructor/instructorAuthSlice';


function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userauth);
  const { instructor } = useSelector((state) => state.instructorauth);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // useEffect(() => {
  //   if (!isMounted) return;
  //   return () => {
  //     if (user) {
  //       dispatch(logout());
  //       dispatch(reset());
  //     } else if (instructor) {
  //       dispatch(logoutInstructor());
  //       dispatch(instructorreset());
  //     }
  //   };
  // }, [dispatch, instructor, user, isMounted]);

  const onLogout = () => {
    if (user) {
      dispatch(logout());
      dispatch(reset());
      navigate('/');
    } else if (instructor) {
      dispatch(logoutInstructor());
      dispatch(instructorreset());
      navigate('/');
    } else {
      console.log('we have some issues');
    }
  };

  return (
    <div>
  <header className="sticky top-0 z-50 bg-white shadow-md navbar-short">
    <div className="container mx-auto flex justify-between items-center py-0 px-6">
      <Link to="/">
        <h5 className="text-red-500 text-xl font-bold tracking-wide">
         Accountability
        </h5>
      </Link>

      <nav className="hidden md:block">
        <ul className="text-black font-medium">
          {instructor ? (
            ""
          ) : (
            <span>
              <li className="inline-block mx-4">
                <Link to="/workouts" className='text-gray-900'>Workouts</Link>
              </li>
              <li className="inline-block mx-4">
                <Link to="/diets" className='text-gray-900'>Diets</Link>
              </li>
              <li className="inline-block mx-4">
                <Link to="/instructors" className='text-gray-900'>Sessions</Link>
              </li>
              <li className="inline-block mx-4">
                <Link to="/instructor/register" className='text-gray-900'>Instructor</Link>
              </li>
            </span>
          )}
        </ul>
      </nav>

      <div>
        {user || instructor ? (
          <div className="flex items-center text-black">
            <Link
              className="mr-8 text-lg font-medium"
              to={instructor ? "/instructor/dashboard" : "/user/dashboard"}
            >
              <i className="fas fa-user mr-2 text-red-500"></i>
              <span className='text-red-500'>Dashboard</span>
            </Link>
            <button
              className="bg-transparent border border-white rounded-full px-6 py-2 text-red-500 font-medium"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/user/login"
              className="bg-white px-6 py-2 rounded-md text-red-500 font-medium mr-4  transition duration-300 ease-in-out"
            >
              Login
            </Link>
            <Link
              to="/user/register"
              className="bg-red-500 px-6 py-2 rounded-md text-white font-medium   transition duration-300 ease-in-out"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  </header>
</div>

);
}

export default Header;