import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";

const initialState = {
	user: JSON.parse(localStorage.getItem("user")) || null,
	token: localStorage.getItem("token") || null,
	loading: false,
	error: null,
	success: false,
};

const authRequest = async (endpoint, payload) => {
	const response = await axios.post(`${API_URL}/${endpoint}`, payload, { headers: { "Content-Type": "application/json" } });
	return response.data;
};

export const register = createAsyncThunk("auth/register", async (data, { rejectWithValue }) => {
	try {
		return await authRequest("register", data);
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || err.message);
	}
});

export const verifyOtp = createAsyncThunk("auth/verifyOtp", async (data, { rejectWithValue }) => {
	try {
		return await authRequest("verify-otp", data);
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || err.message);
	}
});

export const resendOtp = createAsyncThunk("auth/resendOtp", async (data, { rejectWithValue }) => {
	try {
		return await authRequest("resend-otp", data);
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || err.message);
	}
});

export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
	try {
		return await authRequest("login", data);
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || err.message);
	}
});

export const googleLogin = createAsyncThunk("auth/googleLogin", async (data, { rejectWithValue }) => {
	try {
		return await authRequest("google-login", data);
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || err.message);
	}
});

export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (data, { rejectWithValue }) => {
	try {
		return await authRequest("forgot-password", data);
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || err.message);
	}
});

export const resetPassword = createAsyncThunk("auth/resetPassword", async (data, { rejectWithValue }) => {
	try {
		return await authRequest("reset-password", data);
	} catch (err) {
		return rejectWithValue(err.response?.data?.message || err.message);
	}
});

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.loading = false;
			state.error = null;
			state.success = false;
			localStorage.removeItem("user");
			localStorage.removeItem("token");
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(register.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
				state.success = true;
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.success = false;
			})
			.addCase(verifyOtp.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(verifyOtp.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.token = action.payload.token;
				state.user = action.payload.user;
				localStorage.setItem("token", action.payload.token);
				localStorage.setItem("user", JSON.stringify(action.payload.user));
			})
			.addCase(verifyOtp.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.error = null;
				state.success = true;
				localStorage.setItem("token", action.payload.token);
				localStorage.setItem("user", JSON.stringify(action.payload.user));
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(googleLogin.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(googleLogin.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload.otpRequired) {
					state.success = false;
					state.error = null;
				} else {
					state.user = action.payload.user;
					state.token = action.payload.token;
					state.error = null;
					state.success = true;
					localStorage.setItem("token", action.payload.token);
					localStorage.setItem("user", JSON.stringify(action.payload.user));
				}
			})
			.addCase(googleLogin.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(forgotPassword.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(forgotPassword.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(forgotPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(resetPassword.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(resetPassword.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.error = null;
				state.success = true;
				localStorage.setItem("token", action.payload.token);
				localStorage.setItem("user", JSON.stringify(action.payload.user));
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
