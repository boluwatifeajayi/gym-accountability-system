import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = "http://localhost:4070/api/goals/";

// Create goal
const createGoal = async (goalData, token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
      Cookie: `authToken=${token}`
    }
  };
  const response = await axios.post(`${API_URL}create`, goalData, config);
  return response.data;
};

// Delete goal
const deleteGoal = async (goalId, token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
      Cookie: `authToken=${token}`
    }
  };
  const response = await axios.delete(`${API_URL}${goalId}`, config);
  return response.data;
};

// Add task to a goal
const addTask = async (goalId, taskData, token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
      Cookie: `authToken=${token}`
    }
  };
  const response = await axios.post(`${API_URL}${goalId}/tasks`, taskData, config);
  return response.data;
};

// Get all goals
const getAllGoals = async (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
      Cookie: `authToken=${token}`
    }
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get analytics
const getAnalytics = async (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
      Cookie: `authToken=${token}`
    }
  };
  const response = await axios.get(`${API_URL}analytics`, config);
  return response.data;
};

const goalService = {
  createGoal,
  deleteGoal,
  addTask,
  getAllGoals,
  getAnalytics
};

export default goalService;
