import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import surveyService from '../../services/surveyService';

// Async Thunks for getting user survey list
export const getUserSurveyList = createAsyncThunk(
  'survey/getUserSurveyList',
  async (body, { rejectWithValue }) => {
    try {
      const response = await surveyService.userAssignedSurvey(body);
      if (response?.data?.error) throw new Error(response.data.message);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk for fetching pre-screener questions
export const getPreScreenerQuestions = createAsyncThunk(
  'survey/getPreScreenerQuestions',
  async (quotaId, { rejectWithValue }) => {
    try {
      const response = await surveyService.preScreenerQuestions(quotaId);
      if (response?.data?.error) throw new Error(response.data.message);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const submitPreScreenerAnswers = createAsyncThunk(
  'survey/submitPreScreenerAnswers',
  async (answers, { rejectWithValue }) => {
    try {
      const response = await surveyService.submitPreScreenerAnswers(answers);
      if (response?.data?.error) throw new Error(response.data.message);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice for managing survey-related state
const surveySlice = createSlice({
  name: 'survey',
  initialState: {
    surveys: {},
    preScreenerQuestions: {},
    preScreenerSubmitSuccess: false,
    fetching: false,
    submitting: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserSurveyList.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(getUserSurveyList.fulfilled, (state, action) => {
        state.surveys = action.payload;
        state.fetching = false;
      })
      .addCase(getUserSurveyList.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
      })
      .addCase(getPreScreenerQuestions.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(getPreScreenerQuestions.fulfilled, (state, action) => {
        state.preScreenerQuestions = action.payload;
        state.fetching = false;
      })
      .addCase(getPreScreenerQuestions.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
      })
      builder
      .addCase(submitPreScreenerAnswers.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.preScreenerSubmitSuccess = false;
      })
      .addCase(submitPreScreenerAnswers.fulfilled, (state, action) => {
        state.submitting = false;
        state.preScreenerSubmitSuccess = true;
      })
      .addCase(submitPreScreenerAnswers.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      });
  }
});

export default surveySlice.reducer;
