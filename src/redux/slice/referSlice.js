import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import referService from '../../services/referService';
import { notification } from 'antd';

// Async Thunk
export const submitReferData = createAsyncThunk(
  'refer/submitReferData',
  async ({ referData, onSubmitSuccess }, { rejectWithValue }) => {
    try {
      const response = await referService.saveReferData(referData);
      notification.success({
        message: response.message,
      });
      onSubmitSuccess();
      return referData; 
    } catch (error) {
      notification.error({
        message: error?.response?.data?.message,
      });
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Initial State
const initialState = {
  referCode: "",
  error: null,
  submittingReferData: false,
  submittingReferDataError: null,
};

// Slice
const referSlice = createSlice({
  name: 'refer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitReferData.pending, (state) => {
        state.submittingReferData = true;
        state.submittingReferDataError = null;
      })
      .addCase(submitReferData.fulfilled, (state, action) => {
        state.referCode = "";
        state.submittingReferData = false;
      })
      .addCase(submitReferData.rejected, (state, action) => {
        state.submittingReferData = false;
        state.submittingReferDataError = action.payload;
      });
  },
});

export default referSlice.reducer;
