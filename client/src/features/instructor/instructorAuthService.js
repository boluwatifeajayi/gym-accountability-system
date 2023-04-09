import axios from 'axios'

axios.defaults.withCredentials = true

const API_URL = "http://localhost:4070/api/instructor/"

// register instructor
const instructorRegister = async(instructorData) => {
	const response = await axios.post(`${API_URL}register`, instructorData)

	if(response.data){
		localStorage.setItem('instructor', JSON.stringify(response.data))
	}

	return response.data
}

// login instructor
const instructorLogin = async(instructorData) => {
	const response = await axios.post(`${API_URL}login`, instructorData)

	if(response.data){
		localStorage.setItem('instructor', JSON.stringify(response.data))
	}

	return response.data
}

// logout
const logout = () => {
	localStorage.removeItem('instructor')
}

// update instructor
const updateInstructor = async(instructorData) => {
	const response = await axios.put(`${API_URL}instructor/update`, instructorData)

	if(response.data){
		localStorage.setItem('instructor', JSON.stringify(response.data))
	}

	return response.data
}

const authService = {
	instructorRegister,
	instructorLogin,
	logout,
	updateInstructor
}

export default authService
