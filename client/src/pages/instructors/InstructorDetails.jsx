import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInstructorById } from '../../features/instructor/instructorAuthSlice';
import { Link, useParams } from 'react-router-dom'


const InstructorDetails = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const singleInstructor = useSelector((state) => state.instructorauth.instructor);
  const isLoading = useSelector((state) => state.instructorauth.isLoading);
  const isError = useSelector((state) => state.instructorauth.isError);

  useEffect(() => {
    dispatch(getInstructorById(id));
  }, [dispatch, id]);

  console.log(singleInstructor)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching instructor details.</div>;
  }

  return (
    <div>
      <h1>Instructor Details</h1>
   
        <div>
          <h3>{singleInstructor?.instructorFirstname} {singleInstructor?.instructorLastname}</h3>
          <p>Email: {singleInstructor?.instructorEmail}</p>
          {/* Display additional instructor details */}
        </div>
    
    </div>
  );
};

export default InstructorDetails;
