import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createGoal } from "../../features/goal/goalSlice";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const CreateGoal = () => {
  const dispatch = useDispatch();
  const [goalTitle, setGoalTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate()

  const handleGoalTitleChange = (e) => {
    setGoalTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new goal object
    const newGoal = {
      goalTitle,
      description,
    };

    // Dispatch the createGoal action
    dispatch(createGoal(newGoal));

    // Reset the form
    setGoalTitle("");
    setDescription("");
    navigate('/goals')

    
  };

  return (
    <div>
        <Header/>
         <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <h2 className="text-2xl font-bold mb-4">Create a New Goal</h2>
        <form onSubmit={handleSubmit} className="max-w-sm">
          <div className="mb-4">
            <label className="block font-bold mb-1">Goal Title:</label>
            <input
              type="text"
              value={goalTitle}
              onChange={handleGoalTitleChange}
              className="form-input"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Description:</label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="form-textarea form-input"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Create Goal
          </button>
        </form>
      </div>
    </div>
    </div>
   
  );
};

export default CreateGoal;
