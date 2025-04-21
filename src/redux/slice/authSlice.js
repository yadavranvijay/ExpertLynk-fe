import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  continuumEmailLogin,
  continuumEmailRegister,
  continuumLogin,
  continuumLogout,
  continuumMe,
  continuumMeUpdate,
  continuumMeDelete
} from "../../services/identityService";
import { notification } from "antd";

// Async Thunks
export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await continuumEmailRegister(username, email, password);
      return response.data;
    } catch (error) {
      notification.error({ message: error.message || "Registration failed" });
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await continuumEmailLogin(username, password);
      return response.data;
    } catch (error) {
      notification.error({ message: error.message || "" });
      return rejectWithValue(error.message);
    }
  }
);

export const socialLogin = createAsyncThunk(
  "auth/socialLogin",
  async ({ provider, data, ip_data }, { rejectWithValue }) => {
    try {
      const response = await continuumLogin(provider, data, ip_data);
      return response.data;
    } catch (error) {
      notification.error({ message: error.message || "Social login failed" });
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await continuumLogout();
  return;
});

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await continuumMe();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateMe = createAsyncThunk(
  "auth/updateMe",
  async (updatedMe, { rejectWithValue }) => {
    try {
      const response = await continuumMeUpdate(updatedMe);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (DeletedMe, { rejectWithValue }) => {
    try {
      const response = await continuumMeDelete(DeletedMe);
      return response; // Return response if needed
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: !!localStorage.getItem("user"),
    user: JSON.parse(localStorage.getItem("user")) || null,
    personalDetail: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(socialLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(socialLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        const { user, token } = action.payload || {};

        if (user && token) {
          state.status = "succeeded";
          state.user = user;
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", JSON.stringify(token));
        } else {
          state.status = "failed";
          state.error = "Unexpected response structure";
        }
      })
      .addCase(socialLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
         localStorage.removeItem("user");
        localStorage.removeItem("token");
        state.isLoggedIn = false;
        state.user = null;
       
      })
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.personalDetail = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.personalDetail = action.payload;
      })
      .addCase(updateMe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add deleteAccount cases
      .addCase(deleteAccount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.status = "succeeded";
        state.isLoggedIn = false;
        state.user = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;

