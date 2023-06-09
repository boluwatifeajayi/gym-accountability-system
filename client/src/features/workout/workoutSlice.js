import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import workoutService from './workoutService'

const initialState = {
  workouts: [],
  singleWorkout: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  workoutMessage: '',
}

// Create new workout
export const createWorkout = createAsyncThunk(
  'workouts/create',
  async (workoutData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().instructorauth.instructor.token
      return await workoutService.createWorkout(workoutData, token)
    } catch (error) {
      const workoutMessage =
        (error.response &&
          error.response.data &&
          error.response.data.workoutMessage) ||
        error.workoutMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(workoutMessage)
    }
  }
)

// Get all workouts
export const getAllWorkouts = createAsyncThunk(
  'workouts/getAllWorkouts',
  async (_, thunkAPI) => {
    try {
      return await workoutService.getAllWorkouts()
    } catch (error) {
      const workoutMessage =
        (error.response &&
          error.response.data &&
          error.response.data.workoutMessage) ||
        error.workoutMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(workoutMessage)
    }
  }
)

// Get workouts by search
export const getWorkoutsBySearch = createAsyncThunk(
  'workouts/getWorkoutsBySearch',
  async (search, thunkAPI) => {
    try {
      return await workoutService.getWorkoutsBySearch(search)
    } catch (error) {
      const workoutMessage =
        (error.response &&
          error.response.data &&
          error.response.data.workoutMessage) ||
        error.workoutMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(workoutMessage)
    }
  }
)

// Get instructor workouts
export const getInstructorWorkouts = createAsyncThunk(
  'workouts/getInstructorWorkouts',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().instructorauth.instructor.token
      return await workoutService.getInstructorWorkouts(token)
    } catch (error) {
      const workoutMessage =
        (error.response &&
          error.response.data &&
          error.response.data.workoutMessage) ||
        error.workoutMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(workoutMessage)
    }
  }
)

// Get workout by id
export const getWorkoutById = createAsyncThunk(
  'workouts/getWorkoutById',
  async (workoutId, thunkAPI) => {
    try {
      return await workoutService.getWorkoutById(workoutId)
    } catch (error) {
      const workoutMessage =
        (error.response &&
          error.response.data &&
          error.response.data.workoutMessage) ||
        error.workoutMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(workoutMessage)
    }
  }
)

// Get workouts by category
export const getCategoryWorkouts = createAsyncThunk(
  'workouts/getCategoryWorkouts',
  async (category, thunkAPI) => {
    try {
      return await workoutService.getCategoryWorkouts(category)
    } catch (error) {
      const workoutMessage =
        (error.response &&
          error.response.data &&
          error.response.data.workoutMessage) ||
        error.workoutMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(workoutMessage)
    }
  }
)

// Get workouts applied by instructor
export const getInstructorAppliedWorkouts = createAsyncThunk(
  'workouts/getInstructorAppliedWorkouts',
  async (_, thunkAPI) => {
  try {
  const token = thunkAPI.getState().instructorauth.instructor.token
  return await workoutService.getInstructorAppliedWorkouts(token)
  } catch (error) {
  const workoutMessage =
  (error.response &&
  error.response.data &&
  error.response.data.workoutMessage) ||
  error.workoutMessage ||
  error.toString()
  return thunkAPI.rejectWithValue(workoutMessage)
  }
  }
  )
  
  // Apply for a workout
  export const applyWorkout = createAsyncThunk(
  'workouts/applyWorkout',
  async (workoutId, thunkAPI) => {
  try {
  const token = thunkAPI.getState().instructorauth.instructor.token
  return await workoutService.applyWorkout(workoutId, token)
  } catch (error) {
  const workoutMessage =
  (error.response &&
  error.response.data &&
  error.response.data.workoutMessage) ||
  error.workoutMessage ||
  error.toString()
  return thunkAPI.rejectWithValue(workoutMessage)
  }
  }
  )
  
  // Comment on workout
// Comment on workout
export const commentToWorkout = createAsyncThunk(
  'workouts/commentToWorkout',
  async ({ workoutId, commentData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userauth.user.token
      const response = await workoutService.commentToWorkout(workoutId, commentData, token) // Corrected function call
      console.log(token)
      return response
    } catch (error) {
      const workoutMessage =
        (error.response &&
          error.response.data &&
          error.response.data.workoutMessage) ||
        error.workoutMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(workoutMessage)
    }
  }
)

  
  // Delete workout
  // Delete workout


export const deleteWorkout = createAsyncThunk(
	'workouts/deleteWorkout',
	async (workoutId, thunkAPI) => {
	  try {
    const token = thunkAPI.getState().instructorauth.instructor.token
		return await workoutService.deleteWorkout(workoutId, token)
	  } catch (error) {
		const docmessage =
		  (error.response &&
			error.response.data &&
			error.response.data.docmessage) ||
		  error.docmessage ||
		  error.toString()
		return thunkAPI.rejectWithValue(docmessage)
	  }
	}
  )

  

  export const updateWorkout = createAsyncThunk(
    'workouts/updateWorkout',
    async ({ workoutData, workoutId }, thunkAPI) => {
      try {
        const token = thunkAPI.getState().instructorauth.instructor.token
        return await workoutService.updateWorkout(workoutData, workoutId, token)
      } catch (error) {
        const docmessage =
          (error.response &&
            error.response.data &&
            error.response.data.docmessage) ||
          error.docmessage ||
          error.toString()
        return thunkAPI.rejectWithValue(docmessage)
      }
    }
  )
  
  
  // Get instructors applied to workout
  export const getWorkoutInstructors = createAsyncThunk(
	'workouts/getWorkoutInstructors',
	async (workoutId, thunkAPI) => {
	  try {
		const response = await getWorkoutInstructors(workoutId)
		return response
	  } catch (error) {
		const workoutMessage =
		  (error.response &&
			error.response.data &&
			error.response.data.workoutMessage) ||
		  error.workoutMessage ||
		  error.toString()
		return thunkAPI.rejectWithValue(workoutMessage)
	  }
	}
  )
  
  // Get instructors commented on workout
  export const getCommentInstructors = createAsyncThunk(
	'workouts/getCommentInstructors',
	async (workoutId, thunkAPI) => {
	  try {
		const response = await getCommentInstructors(workoutId)
		return response
	  } catch (error) {
		const workoutMessage =
		  (error.response &&
			error.response.data &&
			error.response.data.workoutMessage) ||
		  error.workoutMessage ||
		  error.toString()
		return thunkAPI.rejectWithValue(workoutMessage)
	  }
	}
  )
  
// Get workouts commented by user
export const getCommentedWorkouts = createAsyncThunk(
  'workouts/getCommentedWorkouts',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userauth.user.token;
      return await workoutService.getUserCommentedWorkouts(token);
    } catch (error) {
      const workoutMessage =
        (error.response &&
          error.response.data &&
          error.response.data.workoutMessage) ||
        error.workoutMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(workoutMessage);
    }
  }
);




  const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  
extraReducers: (builder) => {
    
  // Create workout
  builder
  .addCase(createWorkout.pending, (state) => {
  state.isLoading = true
  })
  .addCase(createWorkout.fulfilled, (state, action) => {
  state.isLoading = false
  state.isError = false
  state.isSuccess = true
  state.workouts.push(action.payload)
  })
  .addCase(createWorkout.rejected, (state, action) => {
  state.isLoading = false
  state.isError = true
  state.isSuccess = false
  state.workoutMessage = action.payload || 'Failed to create workout'
  })
  // Get all workouts
builder
.addCase(getAllWorkouts.pending, (state) => {
  state.isLoading = true
})
.addCase(getAllWorkouts.fulfilled, (state, action) => {
  state.isLoading = false
  state.isError = false
  state.isSuccess = true
  state.workouts = action.payload
})
.addCase(getAllWorkouts.rejected, (state, action) => {
  state.isLoading = false
  state.isError = true
  state.isSuccess = false
  state.workoutMessage = action.payload || 'Failed to get all workouts'
})

// Get workouts by search
builder
.addCase(getWorkoutsBySearch.pending, (state) => {
  state.isLoading = true
})
.addCase(getWorkoutsBySearch.fulfilled, (state, action) => {
  state.isLoading = false
  state.isError = false
  state.isSuccess = true
  state.workouts = action.payload
})
.addCase(getWorkoutsBySearch.rejected, (state, action) => {
  state.isLoading = false
  state.isError = true
  state.isSuccess = false
  state.workoutMessage =
	action.payload || 'Failed to get workouts by search'
})

// Get instructor workouts
builder
.addCase(getInstructorWorkouts.pending, (state) => {
  state.isLoading = true
})
.addCase(getInstructorWorkouts.fulfilled, (state, action) => {
  state.isLoading = false
  state.isError = false
  state.isSuccess = true
  state.workouts = action.payload
})
.addCase(getInstructorWorkouts.rejected, (state, action) => {
	state.isLoading = false
	state.isError = true
	state.isSuccess = false
	state.workoutMessage =
	action.payload || 'Failed to get instructor workouts'
	})
	
	// Get workout by id
	builder
	.addCase(getWorkoutById.pending, (state) => {
	state.isLoading = true
	})
	.addCase(getWorkoutById.fulfilled, (state, action) => {
	state.isLoading = false
	state.isError = false
	state.isSuccess = true
	state.singleWorkout = action.payload
	})
	.addCase(getWorkoutById.rejected, (state, action) => {
	state.isLoading = false
	state.isError = true
	state.isSuccess = false
	state.workoutMessage =
	action.payload || 'Failed to get workout by id'
	})
	
	// Get workouts by category
	builder
	.addCase(getCategoryWorkouts.pending, (state) => {
	state.isLoading = true
	})
	.addCase(getCategoryWorkouts.fulfilled, (state, action) => {
	state.isLoading = false
	state.isError = false
	state.isSuccess = true
	state.workouts = action.payload
	})
	.addCase(getCategoryWorkouts.rejected, (state, action) => {
	state.isLoading = false
	state.isError = true
	state.isSuccess = false
	state.workoutMessage =
	action.payload || 'Failed to get workouts by category'
	})
	// Get commented workouts
builder
.addCase(getCommentedWorkouts.pending, (state) => {
  state.isLoading = true;
})
.addCase(getCommentedWorkouts.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.workouts = action.payload;
})
.addCase(getCommentedWorkouts.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.isSuccess = false;
  state.workoutMessage =
    action.payload || 'Failed to get commented workouts';
});

	// Get workouts applied by instructor
	builder
	.addCase(getInstructorAppliedWorkouts.pending, (state) => {
	state.isLoading = true
	})
	.addCase(getInstructorAppliedWorkouts.fulfilled, (state, action) => {
	state.isLoading = false
	state.isError = false
	state.isSuccess = true
	state.workouts = action.payload
	})
	.addCase(getInstructorAppliedWorkouts.rejected, (state, action) => {
	state.isLoading = false
	state.isError = true
	state.isSuccess = false
	state.workoutMessage =
	action.payload || 'Failed to get workouts applied by instructor'
	})


 .addCase(commentToWorkout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(commentToWorkout.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singleWorkout = action.payload
      })
      .addCase(commentToWorkout.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.workoutMessage = action.payload
      })
// Delete workout

.addCase(deleteWorkout.pending, (state) => {
state.isLoading = true
})
.addCase(deleteWorkout.fulfilled, (state, action) => {
state.isLoading = false
state.isSuccess = true
})

.addCase(deleteWorkout.rejected, (state, action) => {
state.isLoading = false
state.isError = true
state.isSuccess = false
state.workoutMessage = action.payload || 'Failed to delete workout'
})

// Update workout
builder
.addCase(updateWorkout.pending, (state) => {
state.isLoading = true
})
.addCase(updateWorkout.fulfilled, (state, action) => {
state.isLoading = false
state.isError = false
state.isSuccess = true

})
.addCase(updateWorkout.rejected, (state, action) => {
state.isLoading = false
state.isError = true
state.isSuccess = false
state.workoutMessage = action.payload || 'Failed to update workout'
})

// Get instructors applied to workout
builder
.addCase(getWorkoutInstructors.pending, (state) => {
state.isLoading = true
})
.addCase(getWorkoutInstructors.fulfilled, (state, action) => {
state.isLoading = false
state.isError = false
state.isSuccess = true
state.workoutInstructors = action.payload
})
.addCase(getWorkoutInstructors.rejected, (state, action) => {
state.isLoading = false
state.isError = true
state.isSuccess = false
state.workoutMessage =
action.payload || 'Failed to get instructors applied to workout'
})

// Get instructors commented on workout
builder
.addCase(getCommentInstructors.pending, (state) => {
state.isLoading = true
})
.addCase(getCommentInstructors.fulfilled, (state, action) => {
state.isLoading = false
state.isError = false
state.isSuccess = true
state.commentInstructors = action.payload
})
.addCase(getCommentInstructors.rejected, (state, action) => {
state.isLoading = false
state.isError = true
state.isSuccess = false
state.workoutMessage =
action.payload || 'Failed to get instructors commented on workout'
})





     
  },
})

export const {reset} = workoutSlice.actions
export default workoutSlice.reducer
