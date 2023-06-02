import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';

const initialState = {
  goals: [],
  singleGoal: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  goalMessage: '',
};

// Create new goal
export const createGoal = createAsyncThunk(
  'goals/create',
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userauth.user.token;
      return await goalService.createGoal(goalData, token);
    } catch (error) {
      const goalMessage =
        (error.response &&
          error.response.data &&
          error.response.data.goalMessage) ||
        error.goalMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(goalMessage);
    }
  }
);

// Delete goal
export const deleteGoal = createAsyncThunk(
  'goals/delete',
  async (goalId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userauth.user.token;
      return await goalService.deleteGoal(goalId, token);
    } catch (error) {
      const goalMessage =
        (error.response &&
          error.response.data &&
          error.response.data.goalMessage) ||
        error.goalMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(goalMessage);
    }
  }
);

// Add task to a goal
export const addTask = createAsyncThunk(
  'goals/addTask',
  async ({ goalId, taskData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userauth.user.token;
      return await goalService.addTask(goalId, { taskData }, token);
    } catch (error) {
      const goalMessage =
        (error.response &&
          error.response.data &&
          error.response.data.goalMessage) ||
        error.goalMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(goalMessage);
    }
  }
);


// Get all goals
export const getAllGoals = createAsyncThunk(
  'goals/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userauth.user.token;
      return await goalService.getAllGoals(token);
    } catch (error) {
      const goalMessage =
        (error.response &&
          error.response.data &&
          error.response.data.goalMessage) ||
        error.goalMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(goalMessage);
    }
  }
);

// Get analytics
export const getAnalytics = createAsyncThunk(
  'goals/getAnalytics',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userauth.user.token;
      return await goalService.getAnalytics(token);
    } catch (error) {
      const goalMessage =
        (error.response &&
          error.response.data &&
          error.response.data.goalMessage) ||
        error.goalMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(goalMessage);
    }
  }
);

const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    // Create goal
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.goalMessage = action.payload || 'Failed to create goal';
      });

    // Delete goal
    builder
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.goalId
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.goalMessage = action.payload || 'Failed to delete goal';
      });

    // Add task to a goal
    builder
      .addCase(addTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const updatedGoal = action.payload;
        const index = state.goals.findIndex(
          (goal) => goal._id === updatedGoal._id
        );
        if (index !== -1) {
          state.goals[index] = updatedGoal;
        }
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.goalMessage = action.payload || 'Failed to add task';
      });

    // Get all goals
    builder
      .addCase(getAllGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getAllGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.goalMessage = action.payload || 'Failed to retrieve goals';
      });

    // Get analytics
    builder
      .addCase(getAnalytics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnalytics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // Handle analytics data
        // You can update the state with the received analytics data here
      })
      .addCase(getAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.goalMessage = action.payload || 'Failed to retrieve analytics';
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
