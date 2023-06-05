import axios from 'axios'

axios.defaults.withCredentials = true

const API_URL = "https://ms-project.onrender.com/api/diets/"

// get all diets
const getAllDiets = async () => {
  const response = await axios.get(`${API_URL}all`)
  return response.data
}

// create diet
const createDiet = async (dietData, token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
      Cookie: `authToken=${token}`
    }
  }
  const response = await axios.post(`${API_URL}create`, dietData, config)

  return response.data
}

// get diets by search
const getDietsBySearch = async (search) => {
  const response = await axios.get(`${API_URL}search/${search}`)
  return response.data
}

// get instructor diets
const getInstructorDiets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(`${API_URL}instructor`, config)

  return response.data
}

// get diet by id
const getDietById = async (dietId) => {
  const response = await axios.get(`${API_URL}diet/${dietId}`)
  return response.data
}

// get diets by category
const getCategoryDiets = async (category) => {
  const response = await axios.get(`/api/diets/category/${category}`)
  return response.data
}

// get diets applied by user
const getUserAppliedDiets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get('/api/diets/applied', config)

  return response.data
}

// apply to diet
const applyToDiet = async (dietId, token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
    }
  }

  const response = await axios.post(`/api/diets/${dietId}/apply`, {}, config)

  return response.data
}

// comment on diet
const commentToDiet = async (dietId, commentData, token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
    }
  }

  const response = await axios.post(`${API_URL}${dietId}/comment`, commentData, config)

  return response.data
}

// delete diet
const deleteDiet = async (dietId, token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
    }
  }

  const response = await axios.delete(`${API_URL}delete/${dietId}`, config)

  return response.data
}

// update diet
const updateDiet = async (dietData, dietId, token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true,
      Cookie: `authToken=${token}`
    }
  }

  const response = await axios.put(`${API_URL}update/${dietId}`, dietData, config)

  return response.data
}

// get users applied to diet
const getDietUsers = async (dietId) => {
	const response = await axios.get(`/api/diets/${dietId}/applied`);
	return response.data;
}
	
// get users commented on diet
const getCommentUsers = async (dietId) => {
	const response = await axios.get(`/api/diets/${dietId}/comments`);
	return response.data;
}

const getUserCommentedDiets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}commented`, config);

  return response.data;
};



const dietService = {
	getAllDiets,
	createDiet,
	getDietsBySearch,
	getInstructorDiets,
	getDietById,
	getCategoryDiets,
	getUserAppliedDiets,
	applyToDiet,
	commentToDiet,
	deleteDiet,
	updateDiet,
	getDietUsers,
	getCommentUsers,
  getUserCommentedDiets,
}

export default dietService

