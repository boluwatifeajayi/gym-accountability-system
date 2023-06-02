import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGoals, addTask } from "../../features/goal/goalSlice";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const GetGoals = () => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goal.goals);

  useEffect(() => {
    dispatch(getAllGoals());
  }, [dispatch]);

  // State for controlling the modal
  const [showModal, setShowModal] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [taskName, setTaskName] = useState("");

  // Function to handle opening the modal and setting the current goal
  const openModal = (goal) => {
    setCurrentGoal(goal);
    setShowModal(true);
  };

  const handleAddTask = () => {
    dispatch(addTask({ goalId: currentGoal._id, taskData: taskName }));
  
    // Clear the new task input and close the modal
    setTaskName("");
    setShowModal(false);
  };
  

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mt-4">All Goals</h2>
          <table className="min-w-full bg-white mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Goal Title</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Progress</th>
                {/* <th className="py-2 px-4 border-b">Tasks</th> */}
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal) => (
                <tr key={goal._id}>
                  <td className="py-2 px-4 border-b">{goal.goalTitle}</td>
                  <td className="py-2 px-4 border-b">{goal.description}</td>
                  <td className="py-2 px-4 border-b">{goal.progress} %</td>
                  {/* <td className="py-2 px-4 border-b">{goal.tasks.join(", ")}</td> */}
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => openModal(goal)}
                    >
                      Add Activity
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">Add Task to Goal</h3>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mb-2"
              placeholder="Enter task"
            />
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleAddTask}
              >
                Add
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetGoals;
