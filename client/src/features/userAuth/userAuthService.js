import axios from 'axios'

axios.defaults.withCredentials = true

const API_URL = "https://ms-project.onrender.com/api/users/"

// register user
const register = async(userData) => {
	const response = await axios.post(`${API_URL}register`, userData)

	if(response.data){
		localStorage.setItem('user', JSON.stringify(response.data))
	}

	return response.data
}

// login user
const login = async(userData) => {
	const response = await axios.post(`${API_URL}login`, userData)

	if(response.data){
		localStorage.setItem('user', JSON.stringify(response.data))
	}

	return response.data
}

// logout
const logout = () => {
	localStorage.removeItem('user')
}

// update user
const updateUser = async(userData) => {
	const response = await axios.put(`${API_URL}me`, userData)

	if(response.data){
		localStorage.setItem('user', JSON.stringify(response.data))
	}

	return response.data
}

const authService = {
	register,
	login,
	logout,
	updateUser
}

export default authService
