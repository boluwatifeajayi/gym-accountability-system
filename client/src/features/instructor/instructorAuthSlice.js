import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instructorAuthService from './instructorAuthService'

// get instructor from local storage
const instructor = JSON.parse(localStorage.getItem('instructor'))


// initial states
const initialState = {
	instructor: instructor ? instructor: null, 
	instructors: [],
	singleInstructor: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

// instructorRegister instructor
// createAsyncThunk is what is responsible for the asyc logic on the addCase extra reducer parts below
export const registerInstructor = createAsyncThunk('instructorauth/instructorRegister', async (instructor, thunkAPI) => {
	try{
		// instructorAuthService.instructorRegister is the function to instructorRegister instructor from instructorauthservice file
		return await instructorAuthService.instructorRegister(instructor)
	} 
	catch(error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	 }
	
})

// instructorLogin instructor
export const loginInstructor = createAsyncThunk('instructorauth/instructorLogin', async (instructor, thunkAPI) => {
	try{
		return await instructorAuthService.instructorLogin(instructor)
	} 
	catch(error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	 }
	
})

// update instructor
export const updateInstructor = createAsyncThunk('instructorauth/updateInstructor', async (instructorData, thunkAPI) => {
	try{
		return await instructorAuthService.updateInstructor(instructorData)
	} 
	catch(error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})


export const getInstructors = createAsyncThunk('instructorauth/getInstructors', async (_, thunkAPI) => {
	try {
	  return await instructorAuthService.getInstructors();
	} catch (error) {
	  const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
	  return thunkAPI.rejectWithValue(message);
	}
  });
  
  // Get instructor by ID
  export const getInstructorById = createAsyncThunk('instructorauth/getInstructorById', async (instructorId, thunkAPI) => {
	try {
	  return await instructorAuthService.getInstructorById(instructorId);
	} catch (error) {
	  const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
	  return thunkAPI.rejectWithValue(message);
	}
  });

// logout
export const logoutInstructor =  createAsyncThunk('instructorauth/logout', async () => {
	await instructorAuthService.logout()
})

export const instructorAuthSlice = createSlice({
	name: 'instructorauth',
	initialState,

	// standard reducer logic, with auto-generated action types per reducer
	reducers: {
		instructorreset: (state) => {
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.message = ''
		}
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle various state as needed
		builder
			// instructorRegister actions
			.addCase(registerInstructor.pending, (state) => {
				state.isLoading = true
			})
			.addCase(registerInstructor.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.instructor = action.payload
			})
			.addCase(registerInstructor.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.instructor = null
			})

			// instructorLogin
			.addCase(loginInstructor.pending, (state) => {
				state.isLoading = true
			})
			.addCase(loginInstructor.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.instructor = action.payload
			})
			.addCase(loginInstructor.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.instructor = null
			})

			// Get instructors actions
			.addCase(getInstructors.pending, (state) => {
				state.isLoading = true;
			  })
			  .addCase(getInstructors.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.instructors = action.payload; // Update the instructors state with the fetched data
			  })
			  .addCase(getInstructors.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.instructors = []; // Clear the instructors state in case of failure
			  })
		  
			  // Get instructor by ID actions
			  .addCase(getInstructorById.pending, (state) => {
				state.isLoading = true;
			  })
			  .addCase(getInstructorById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.singleInstructor = action.payload; // Update the singleInstructor state with the fetched data
			  })
			  .addCase(getInstructorById.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			  })
		  

			// update yser
				.addCase(updateInstructor.pending, (state) => {
					state.isLoading = true
				})
				.addCase(updateInstructor.fulfilled, (state, action) => {
					state.isLoading = false
					state.isSuccess = true
					state.instructor = action.payload
				})
				.addCase(updateInstructor.rejected, (state, action) => {
					state.isLoading = false
					state.isError = true
					state.message = action.payload
				})

			// logout
			.addCase(logoutInstructor.fulfilled, (state) => {
				state.instructor = null
			})
	}
})

export const {instructorreset} = instructorAuthSlice.actions
export default instructorAuthSlice.reducer

