import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCommentedDiets, reset as resetDiets } from '../../features/diet/dietSlice';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

function AppliedDiets() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { diets, isLoading, isError, dietMessage } = useSelector((state) => state.diet);

  useEffect(() => {
    if (isError) {
      console.log(dietMessage);
    }

    dispatch(getCommentedDiets()); // Fetch commented diets only
    dispatch(getCommentedDiets());

    return () => {
      dispatch(resetDiets());
    };
  }, [dispatch, isError, dietMessage]);

  if (isLoading) {
    return (
      <div className="text-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
       <Header />
       <div className="flex">
      <Sidebar username="John Doe" />
      <div className="flex-grow">
       
        <div className="mx-auto px-10 mt-8 mb-16">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold">Diets You Joined</h1>
          </div>
          {diets.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-800">Diet Name</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-800">Category</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-800">Duration</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-800">Difficulty</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {diets.map((diet, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="px-6 py-4">{diet.dietName}</td>
                    <td className="px-6 py-4">{diet.category}</td>
                    <td className="px-6 py-4">{diet.duration}</td>
                    <td className="px-6 py-4">{diet.difficulty}</td>
                    <td className="px-6 py-4">
                      <Link to={`/diet/${diet._id}`}>
                        <button className="px-3 py-1 text-white bg-red-500 rounded">Learn More</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">You haven't joined any diets.</p>
          )}
          <hr />
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default AppliedDiets;
