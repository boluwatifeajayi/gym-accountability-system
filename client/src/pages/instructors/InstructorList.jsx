import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInstructors } from '../../features/instructor/instructorAuthSlice';
import Header from '../../components/Header';
import { Link } from 'react-router-dom'

const InstructorList = () => {
  const dispatch = useDispatch();
  const instructors = useSelector((state) => state.instructorauth.instructors);
  const isLoading = useSelector((state) => state.instructorauth.isLoading);
  const isError = useSelector((state) => state.instructorauth.isError);

  useEffect(() => {
    dispatch(getInstructors());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching instructors.</div>;
  }

  return (
    <div>
    <Header />
    <div className='container mx-40 my-10'>
      <h1 className="text-2xl font-bold mb-4">Instructors</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {instructors?.map((instructor) => (
          <div key={instructor._id} className="border rounded p-4">
            <h3 className="text-lg font-bold mb-6">{instructor.instructorFirstname} {instructor.instructorLastname}</h3>
            <a href={`mailto:${instructor.instructorEmail}`} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Contact
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
    
  );
};

export default InstructorList;
