import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk
export const fetchSurveys = createAsyncThunk('surveys/fetchSurveys', async () => {
  const response = await axios.post('https://api.websamp.com/v1/api/campaign/public/surveys', {
    order_by: ['-created_at']
  }, {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
  return response.data;
});

// Create the slice
const surveysSlice = createSlice({
  name: 'surveys',
  initialState: {
    surveys: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurveys.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSurveys.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.surveys = action.payload;
      })
      .addCase(fetchSurveys.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default surveysSlice.reducer;
