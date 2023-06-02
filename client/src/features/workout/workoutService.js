import axios from 'axios'

axios.defaults.withCredentials = true

const API_URL = "http://localhost:4070/api/workouts/"

// get all workouts
const getAllWorkouts = async () => {
  const response = await axios.get(`${API_URL}all`)
  return response.data
}

// create workout
const createWorkout = async (workoutData, token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
      Cookie: `authToken=${token}`
    }
  }
  const response = await axios.post(`${API_URL}create`, workoutData, config)

  return response.data
}

// get workouts by search
const getWorkoutsBySearch = async (search) => {
  const response = await axios.get(`${API_URL}search/${search}`)
  return response.data
}

// get instructor workouts
const getInstructorWorkouts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(`${API_URL}instructor`, config)

  return response.data
}

// get workout by id
const getWorkoutById = async (workoutId) => {
  const response = await axios.get(`${API_URL}workout/${workoutId}`)
  return response.data
}

// get workouts by category
const getCategoryWorkouts = async (category) => {
  const response = await axios.get(`/api/workouts/category/${category}`)
  return response.data
}

// get workouts applied by user
const getUserAppliedWorkouts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get('/api/workouts/applied', config)

  return response.data
}

// apply to workout
const applyToWorkout = async (workoutId, token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
    }
  }

  const response = await axios.post(`/api/workouts/${workoutId}/apply`, {}, config)

  return response.data
}

// comment on workout
const commentToWorkout = async (workoutId, commentData, token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
    }
  }

  const response = await axios.post(`${API_URL}${workoutId}/comment`, commentData, config)

  return response.data
}

// delete workout
const deleteWorkout = async (workoutId, token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
    }
  }

  const response = await axios.delete(`${API_URL}delete/${workoutId}`, config)
  console.log("deleted")
  return response.data
}

// update workout
const updateWorkout = async (workoutData, workoutId, token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
      Cookie: `authToken=${token}`
    }
  }

  const response = await axios.put(`${API_URL}update/${workoutId}`, workoutData, config)

  return response.data
}

// get users applied to workout
const getWorkoutUsers = async (workoutId) => {
	const response = await axios.get(`/api/workouts/${workoutId}/applied`);
	return response.data;
}
	
// get users commented on workout
const getCommentUsers = async (workoutId) => {
	const response = await axios.get(`/api/workouts/${workoutId}/comments`);
	return response.data;
}

const getUserCommentedWorkouts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}commented`, config);

  return response.data;
};



const workoutService = {
	getAllWorkouts,
	createWorkout,
	getWorkoutsBySearch,
	getInstructorWorkouts,
	getWorkoutById,
	getCategoryWorkouts,
	getUserAppliedWorkouts,
	applyToWorkout,
	commentToWorkout,
	deleteWorkout,
	updateWorkout,
	getWorkoutUsers,
	getCommentUsers,
  getUserCommentedWorkouts,
}

export default workoutService

