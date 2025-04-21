import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import rewardService from '../../services/rewardService';
import { notification } from 'antd';

// Async Thunks
export const pointTransactions = createAsyncThunk(
  'reward/pointTransactions',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await rewardService.getAllRewardData(payload);
      if (response.status !== 200) throw new Error(response.message);
      return response.data;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(error.message);
    }
  }
);

export const saveRefferalCode = createAsyncThunk(
  'reward/saveRefferalCode',
  async (referCode, { rejectWithValue }) => {
    try {
      const response = await rewardService.saveRefferalCode(referCode);
      if (response.status !== 200) throw new Error(response.data.message);
      notification.success({ message: response.data.message });
      return referCode;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(error.message);
    }
  }
);

export const withdrawRequestUser = createAsyncThunk(
  'reward/withdrawRequestUser',
  async (withdrawDetails, { rejectWithValue }) => {
    try {
      const response = await rewardService.withdrawRequest(withdrawDetails);
      if (response.error) throw new Error(response.message);
      notification.success({ message: "Withdraw Request Sent Successfully" });
      return withdrawDetails;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(error.message);
    }
  }
);

export const inviteUserFriend = createAsyncThunk(
  'reward/inviteUserFriend',
  async (emails, { rejectWithValue }) => {
    try {
      const response = await rewardService.inviteFriends(emails);
      if (response.data.error) throw new Error(response.data.message);
      notification.success({ message: "Sent invitation to " + response.data.emails + " users" });
      return emails;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(error.message);
    }
  }
);

export const myRefferalsList = createAsyncThunk(
  'reward/myRefferalsList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await rewardService.getMyRefferals();
      if (response.status !== 200) throw new Error(response.message);
      return response.data;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(error.message);
    }
  }
);

export const listReferrals = createAsyncThunk(
  'reward/listReferrals',
  async (body, { rejectWithValue }) => {
    try {
      const response = await rewardService.listRefferals(body);
      if (response.status !== 200) throw new Error(response.message);
      return response.data;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(error.message);
    }
  }
);

export const listReferralTransactions = createAsyncThunk(
  'reward/listReferralTransactions',
  async (body, { getState, rejectWithValue }) => {
    try {
      const response = await rewardService.listRefferalTransaction(body);
      const state = getState();
      state.reward.listReferralsTransactionData[body.referee_id] = response.data;
      if (response.status !== 200) throw new Error(response.message);
      return state.reward.listReferralsTransactionData;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const rewardSlice = createSlice({
  name: 'reward',
  initialState: {
    transactionData: [],
    myRefferalData: {},
    listReferralsData: {},
    listReferralsTransactionData: {},
    myWithdrawData: [],
    fetchingRefferalData: false,
    fetchingRefferalTransactionData: false,
    refferalDataError: null,
    refferalTransactionDataError: null,
    fetchingTransactionData: false,
    transactionDataError: null,
    submitingCode: false,
    submitingCodeError: null,
    submitingwithdrawDetails: false,
    submitingwithdrawDetailsError: null,
    invite: false,
    inviteError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(pointTransactions.pending, (state) => {
        state.fetchingTransactionData = true;
        state.transactionDataError = null;
      })
      .addCase(pointTransactions.fulfilled, (state, action) => {
        state.transactionData = action.payload;
        state.fetchingTransactionData = false;
      })
      .addCase(pointTransactions.rejected, (state, action) => {
        state.fetchingTransactionData = false;
        state.transactionDataError = action.payload;
      })
      .addCase(saveRefferalCode.pending, (state) => {
        state.submitingCode = true;
        state.submitingCodeError = null;
      })
      .addCase(saveRefferalCode.fulfilled, (state) => {
        state.submitingCode = false;
      })
      .addCase(saveRefferalCode.rejected, (state, action) => {
        state.submitingCode = false;
        state.submitingCodeError = action.payload;
      })
      .addCase(withdrawRequestUser.pending, (state) => {
        state.submitingwithdrawDetails = true;
        state.submitingwithdrawDetailsError = null;
      })
      .addCase(withdrawRequestUser.fulfilled, (state) => {
        state.submitingwithdrawDetails = false;
      })
      .addCase(withdrawRequestUser.rejected, (state, action) => {
        state.submitingwithdrawDetails = false;
        state.submitingwithdrawDetailsError = action.payload;
      })
      .addCase(inviteUserFriend.pending, (state) => {
        state.invite = true;
        state.inviteError = null;
      })
      .addCase(inviteUserFriend.fulfilled, (state) => {
        state.invite = false;
      })
      .addCase(inviteUserFriend.rejected, (state, action) => {
        state.invite = false;
        state.inviteError = action.payload;
      })
      .addCase(myRefferalsList.pending, (state) => {
        state.fetchingRefferalData = true;
        state.refferalDataError = null;
      })
      .addCase(myRefferalsList.fulfilled, (state, action) => {
        state.myRefferalData = action.payload;
        state.fetchingRefferalData = false;
      })
      .addCase(myRefferalsList.rejected, (state, action) => {
        state.fetchingRefferalData = false;
        state.refferalDataError = action.payload;
      })
      .addCase(listReferrals.pending, (state) => {
        state.fetchingRefferalData = true;
        state.refferalDataError = null;
      })
      .addCase(listReferrals.fulfilled, (state, action) => {
        state.listReferralsData = action.payload;
        state.fetchingRefferalData = false;
      })
      .addCase(listReferrals.rejected, (state, action) => {
        state.fetchingRefferalData = false;
        state.refferalDataError = action.payload;
      })
      .addCase(listReferralTransactions.pending, (state) => {
        state.fetchingRefferalTransactionData = true;
        state.refferalTransactionDataError = null;
      })
      .addCase(listReferralTransactions.fulfilled, (state, action) => {
        state.listReferralsTransactionData = action.payload;
        state.fetchingRefferalTransactionData = false;
      })
      .addCase(listReferralTransactions.rejected, (state, action) => {
        state.fetchingRefferalTransactionData = false;
        state.refferalTransactionDataError = action.payload;
      });
  }
});

export default rewardSlice.reducer;
