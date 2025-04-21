import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProfileService from '../../services/profileService';
import { notification } from 'antd';

// Async Thunks
export const fetchAllCategoryData = createAsyncThunk(
  'profile/fetchAllCategoryData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ProfileService.getAllCategoryData();
      return response;
    } catch (error) {
      
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const submitCategoryData = createAsyncThunk(
  'profile/submitCategoryData',
  async ({ categoryData }, { rejectWithValue }) => {
    try {
      const response = await ProfileService.saveCategoryData(categoryData);
      notification.success({
        message: 'Answer Submitted Successfully',
      });
      return response;
    } catch (error) {
      
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Initial State
const initialState = {
  isLoading:false,
  allCategoryData: {},
  fetchingCategoryData: false,
  categoryDataError: null,
  submittingCategoryData: false,
  submittingCategoryDataError: null,
  is_success: false,
};

// Slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategoryData.pending, (state) => {
        state.isLoading = true;
        state.fetchingCategoryData = true;
        state.categoryDataError = null;
        state.is_success = false;
      })
      .addCase(fetchAllCategoryData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allCategoryData = action.payload;
        state.fetchingCategoryData = false;
        state.is_success = true;
      })
      .addCase(fetchAllCategoryData.rejected, (state, action) => {
        state.isLoading = false;
        state.fetchingCategoryData = false;
        state.categoryDataError = action.payload;
        state.is_success = false;
      })
      .addCase(submitCategoryData.pending, (state) => {
        state.submittingCategoryData = true;
        state.submittingCategoryDataError = null;
      })
      .addCase(submitCategoryData.fulfilled, (state, action) => {
        const allCategoryData = state.allCategoryData;
        allCategoryData[action.payload.id] = action.payload;
        state.allCategoryData = allCategoryData;
        state.submittingCategoryData = false;
      })
      .addCase(submitCategoryData.rejected, (state, action) => {
        state.submittingCategoryData = false;
        state.submittingCategoryDataError = action.payload;
      });
  },
});

export default profileSlice.reducer;
