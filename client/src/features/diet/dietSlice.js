import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dietService from './dietService'

const initialState = {
  diets: [],
  singleDiet: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  dietMessage: '',
}

// Create new diet
export const createDiet = createAsyncThunk(
  'diets/create',
  async (dietData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().instructorauth.instructor.token
      return await dietService.createDiet(dietData, token)
    } catch (error) {
      const dietMessage =
        (error.response &&
          error.response.data &&
          error.response.data.dietMessage) ||
        error.dietMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(dietMessage)
    }
  }
)

// Get all diets
export const getAllDiets = createAsyncThunk(
  'diets/getAllDiets',
  async (_, thunkAPI) => {
    try {
      return await dietService.getAllDiets()
    } catch (error) {
      const dietMessage =
        (error.response &&
          error.response.data &&
          error.response.data.dietMessage) ||
        error.dietMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(dietMessage)
    }
  }
)

// Get diets by search
export const getDietsBySearch = createAsyncThunk(
  'diets/getDietsBySearch',
  async (search, thunkAPI) => {
    try {
      return await dietService.getDietsBySearch(search)
    } catch (error) {
      const dietMessage =
        (error.response &&
          error.response.data &&
          error.response.data.dietMessage) ||
        error.dietMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(dietMessage)
    }
  }
)

// Get instructor diets
export const getInstructorDiets = createAsyncThunk(
  'diets/getInstructorDiets',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().instructorauth.instructor.token
      return await dietService.getInstructorDiets(token)
    } catch (error) {
      const dietMessage =
        (error.response &&
          error.response.data &&
          error.response.data.dietMessage) ||
        error.dietMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(dietMessage)
    }
  }
)

// Get diet by id
export const getDietById = createAsyncThunk(
  'diets/getDietById',
  async (dietId, thunkAPI) => {
    try {
      return await dietService.getDietById(dietId)
    } catch (error) {
      const dietMessage =
        (error.response &&
          error.response.data &&
          error.response.data.dietMessage) ||
        error.dietMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(dietMessage)
    }
  }
)

// Get diets by category
export const getCategoryDiets = createAsyncThunk(
  'diets/getCategoryDiets',
  async (category, thunkAPI) => {
    try {
      return await dietService.getCategoryDiets(category)
    } catch (error) {
      const dietMessage =
        (error.response &&
          error.response.data &&
          error.response.data.dietMessage) ||
        error.dietMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(dietMessage)
    }
  }
)

// Get diets applied by instructor
export const getInstructorAppliedDiets = createAsyncThunk(
  'diets/getInstructorAppliedDiets',
  async (_, thunkAPI) => {
  try {
  const token = thunkAPI.getState().instructorauth.instructor.token
  return await dietService.getInstructorAppliedDiets(token)
  } catch (error) {
  const dietMessage =
  (error.response &&
  error.response.data &&
  error.response.data.dietMessage) ||
  error.dietMessage ||
  error.toString()
  return thunkAPI.rejectWithValue(dietMessage)
  }
  }
  )
  
  // Apply for a diet
  export const applyDiet = createAsyncThunk(
  'diets/applyDiet',
  async (dietId, thunkAPI) => {
  try {
  const token = thunkAPI.getState().instructorauth.instructor.token
  return await dietService.applyDiet(dietId, token)
  } catch (error) {
  const dietMessage =
  (error.response &&
  error.response.data &&
  error.response.data.dietMessage) ||
  error.dietMessage ||
  error.toString()
  return thunkAPI.rejectWithValue(dietMessage)
  }
  }
  )
  
  // Comment on diet
// Comment on diet
export const commentToDiet = createAsyncThunk(
  'diets/commentToDiet',
  async ({ dietId, commentData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userauth.user.token
      const response = await dietService.commentToDiet(dietId, commentData, token) // Corrected function call
      console.log(token)
      return response
    } catch (error) {
      const dietMessage =
        (error.response &&
          error.response.data &&
          error.response.data.dietMessage) ||
        error.dietMessage ||
        error.toString()
      return thunkAPI.rejectWithValue(dietMessage)
    }
  }
)

  
  // Delete diet
  export const deleteDiet = createAsyncThunk(
	'diets/deleteDiet',
	async (dietId, thunkAPI) => {
	  try {
		const token = thunkAPI.getState().instructorauth.instructor.token
		const response = await deleteDiet(dietId, token)
		return response
	  } catch (error) {
		const dietMessage =
		  (error.response &&
			error.response.data &&
			error.response.data.dietMessage) ||
		  error.dietMessage ||
		  error.toString()
		return thunkAPI.rejectWithValue(dietMessage)
	  }
	}
  )
  

  export const updateDiet = createAsyncThunk(
    'diets/updateDiet',
    async ({ dietData, dietId }, thunkAPI) => {
      try {
        const token = thunkAPI.getState().instructorauth.instructor.token
        return await dietService.updateDiet(dietData, dietId, token)
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
  
  
  // Get instructors applied to diet
  export const getDietInstructors = createAsyncThunk(
	'diets/getDietInstructors',
	async (dietId, thunkAPI) => {
	  try {
		const response = await getDietInstructors(dietId)
		return response
	  } catch (error) {
		const dietMessage =
		  (error.response &&
			error.response.data &&
			error.response.data.dietMessage) ||
		  error.dietMessage ||
		  error.toString()
		return thunkAPI.rejectWithValue(dietMessage)
	  }
	}
  )
  
  // Get instructors commented on diet
  export const getCommentInstructors = createAsyncThunk(
	'diets/getCommentInstructors',
	async (dietId, thunkAPI) => {
	  try {
		const response = await getCommentInstructors(dietId)
		return response
	  } catch (error) {
		const dietMessage =
		  (error.response &&
			error.response.data &&
			error.response.data.dietMessage) ||
		  error.dietMessage ||
		  error.toString()
		return thunkAPI.rejectWithValue(dietMessage)
	  }
	}
  )
  
// Get diets commented by user
export const getCommentedDiets = createAsyncThunk(
  'diets/getCommentedDiets',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userauth.user.token;
      return await dietService.getUserCommentedDiets(token);
    } catch (error) {
      const dietMessage =
        (error.response &&
          error.response.data &&
          error.response.data.dietMessage) ||
        error.dietMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(dietMessage);
    }
  }
);




  const dietSlice = createSlice({
  name: 'diet',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  
extraReducers: (builder) => {
    
  // Create diet
  builder
  .addCase(createDiet.pending, (state) => {
  state.isLoading = true
  })
  .addCase(createDiet.fulfilled, (state, action) => {
  state.isLoading = false
  state.isError = false
  state.isSuccess = true
  state.diets.push(action.payload)
  })
  .addCase(createDiet.rejected, (state, action) => {
  state.isLoading = false
  state.isError = true
  state.isSuccess = false
  state.dietMessage = action.payload || 'Failed to create diet'
  })
  // Get all diets
builder
.addCase(getAllDiets.pending, (state) => {
  state.isLoading = true
})
.addCase(getAllDiets.fulfilled, (state, action) => {
  state.isLoading = false
  state.isError = false
  state.isSuccess = true
  state.diets = action.payload
})
.addCase(getAllDiets.rejected, (state, action) => {
  state.isLoading = false
  state.isError = true
  state.isSuccess = false
  state.dietMessage = action.payload || 'Failed to get all diets'
})

// Get diets by search
builder
.addCase(getDietsBySearch.pending, (state) => {
  state.isLoading = true
})
.addCase(getDietsBySearch.fulfilled, (state, action) => {
  state.isLoading = false
  state.isError = false
  state.isSuccess = true
  state.diets = action.payload
})
.addCase(getDietsBySearch.rejected, (state, action) => {
  state.isLoading = false
  state.isError = true
  state.isSuccess = false
  state.dietMessage =
	action.payload || 'Failed to get diets by search'
})

// Get instructor diets
builder
.addCase(getInstructorDiets.pending, (state) => {
  state.isLoading = true
})
.addCase(getInstructorDiets.fulfilled, (state, action) => {
  state.isLoading = false
  state.isError = false
  state.isSuccess = true
  state.diets = action.payload
})
.addCase(getInstructorDiets.rejected, (state, action) => {
	state.isLoading = false
	state.isError = true
	state.isSuccess = false
	state.dietMessage =
	action.payload || 'Failed to get instructor diets'
	})
	
	// Get diet by id
	builder
	.addCase(getDietById.pending, (state) => {
	state.isLoading = true
	})
	.addCase(getDietById.fulfilled, (state, action) => {
	state.isLoading = false
	state.isError = false
	state.isSuccess = true
	state.singleDiet = action.payload
	})
	.addCase(getDietById.rejected, (state, action) => {
	state.isLoading = false
	state.isError = true
	state.isSuccess = false
	state.dietMessage =
	action.payload || 'Failed to get diet by id'
	})
	
	// Get diets by category
	builder
	.addCase(getCategoryDiets.pending, (state) => {
	state.isLoading = true
	})
	.addCase(getCategoryDiets.fulfilled, (state, action) => {
	state.isLoading = false
	state.isError = false
	state.isSuccess = true
	state.diets = action.payload
	})
	.addCase(getCategoryDiets.rejected, (state, action) => {
	state.isLoading = false
	state.isError = true
	state.isSuccess = false
	state.dietMessage =
	action.payload || 'Failed to get diets by category'
	})
	// Get commented diets
builder
.addCase(getCommentedDiets.pending, (state) => {
  state.isLoading = true;
})
.addCase(getCommentedDiets.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.diets = action.payload;
})
.addCase(getCommentedDiets.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.isSuccess = false;
  state.dietMessage =
    action.payload || 'Failed to get commented diets';
});

	// Get diets applied by instructor
	builder
	.addCase(getInstructorAppliedDiets.pending, (state) => {
	state.isLoading = true
	})
	.addCase(getInstructorAppliedDiets.fulfilled, (state, action) => {
	state.isLoading = false
	state.isError = false
	state.isSuccess = true
	state.diets = action.payload
	})
	.addCase(getInstructorAppliedDiets.rejected, (state, action) => {
	state.isLoading = false
	state.isError = true
	state.isSuccess = false
	state.dietMessage =
	action.payload || 'Failed to get diets applied by instructor'
	})


 .addCase(commentToDiet.pending, (state) => {
        state.isLoading = true
      })
      .addCase(commentToDiet.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singleDiet = action.payload
      })
      .addCase(commentToDiet.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.dietMessage = action.payload
      })
// Delete diet
builder
.addCase(deleteDiet.pending, (state) => {
state.isLoading = true
})
.addCase(deleteDiet.fulfilled, (state, action) => {
state.isLoading = false
state.isError = false
state.isSuccess = true
state.diets = state.diets.filter(
(diet) => diet._id !== action.payload._id
)
})
.addCase(deleteDiet.rejected, (state, action) => {
state.isLoading = false
state.isError = true
state.isSuccess = false
state.dietMessage = action.payload || 'Failed to delete diet'
})

// Update diet
builder
.addCase(updateDiet.pending, (state) => {
state.isLoading = true
})
.addCase(updateDiet.fulfilled, (state, action) => {
state.isLoading = false
state.isError = false
state.isSuccess = true

})
.addCase(updateDiet.rejected, (state, action) => {
state.isLoading = false
state.isError = true
state.isSuccess = false
state.dietMessage = action.payload || 'Failed to update diet'
})

// Get instructors applied to diet
builder
.addCase(getDietInstructors.pending, (state) => {
state.isLoading = true
})
.addCase(getDietInstructors.fulfilled, (state, action) => {
state.isLoading = false
state.isError = false
state.isSuccess = true
state.dietInstructors = action.payload
})
.addCase(getDietInstructors.rejected, (state, action) => {
state.isLoading = false
state.isError = true
state.isSuccess = false
state.dietMessage =
action.payload || 'Failed to get instructors applied to diet'
})

// Get instructors commented on diet
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
state.dietMessage =
action.payload || 'Failed to get instructors commented on diet'
})





     
  },
})

export const {reset} = dietSlice.actions
export default dietSlice.reducer
