import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = "http://localhost:4070/api/instructor/";

// Register instructor
const instructorRegister = async (instructorData) => {
  try {
    const response = await axios.post(`${API_URL}register`, instructorData);

    if (response.data) {
      localStorage.setItem('instructor', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login instructor
const instructorLogin = async (instructorData) => {
  try {
    const response = await axios.post(`${API_URL}login`, instructorData);

    if (response.data) {
      localStorage.setItem('instructor', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Logout instructor
const logout = () => {
  localStorage.removeItem('instructor');
};

// Update instructor
const updateInstructor = async (instructorData) => {
  try {
    const response = await axios.put(`${API_URL}instructor/update`, instructorData);

    if (response.data) {
      localStorage.setItem('instructor', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all instructors
const getInstructors = async () => {
  try {
    const response = await axios.get(`${API_URL}instructors`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get instructor by ID
const getInstructorById = async (instructorId) => {
  try {
    const response = await axios.get(`${API_URL}instructor/${instructorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const instructorAuthService = {
  instructorRegister,
  instructorLogin,
  logout,
  updateInstructor,
  getInstructors,
  getInstructorById,
};

export default instructorAuthService;
