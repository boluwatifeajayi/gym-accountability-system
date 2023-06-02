import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDiets, getDietsBySearch, reset } from '../../features/diet/dietSlice';
import Header from '../../components/Header';

function AllDiets() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const { diets, isLoading, isError, isSuccess, dietMessage } = useSelector((state) => state.diet);

  useEffect(() => {
    if (isError) {
      console.log(dietMessage);
    }

    dispatch(getAllDiets());

    return () => {
      dispatch(reset());
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getDietsBySearch(search));
  };

  const handleClearSearch = () => {
    setSearch('');
    dispatch(getAllDiets());
  };

  if (isLoading) {
    return (
      <h1 className='loading'>
        Loading...
      </h1>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-40 mt-8 mb-16">
        <h1 className="text-3xl font-semibold container mb-6">All Diets</h1>
        <form onSubmit={handleSearch}>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search Diets, categories, etc...."
              className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:border-red-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="px-4 py-2 ml-2 text-white bg-red-500 rounded-md hover:bg-gray-700">
              Search
            </button>
            <button
              className="px-4 py-2 ml-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={handleClearSearch}
            >
              Clear
            </button>
          </div>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {diets.length > 0 ? (
            diets.map((diet, index) => (
              <div key={index} className="bg-white p-4 rounded shadow-md mt-4">
                <div className="relative w-full h-32">
                  <img src={diet.imageLink} alt={diet.dietName} className="absolute top-0 left-0 w-full h-full object-cover rounded" />
                </div>
                <h2 className="text-xl font-semibold mb-2">{diet.dietName}</h2>
                <p className="text-gray-500 mb-2 font-semibold">{diet.category}</p>
               
                <Link to={`/diet/${diet._id}`}>
                  <button className="px-3 py-1 text-white bg-red-500 rounded">Learn More</button>
                </Link>
              </div>
            ))
          ) : (
            <p className='text-center'>You haven't Posted Any Diets...Click Create New Diet To Get Started </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllDiets;
