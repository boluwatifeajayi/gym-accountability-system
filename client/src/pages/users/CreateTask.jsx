import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../features/goal/goalSlice";

const CreateTask = ({ goalId }) => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new task object
    const newTask = {
      taskName,
      date,
    };

    // Dispatch the addTask action
    dispatch(addTask({ goalId, task: newTask }));

    // Reset the form
    setTaskName("");
    setDate("");
  };

  return (
    <div>
      <h2>Add a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Name:</label>
          <input type="text" value={taskName} onChange={handleTaskNameChange} />
        </div>
        <div>
          <label>Date:</label>
          <input type="text" value={date} onChange={handleDateChange} />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
