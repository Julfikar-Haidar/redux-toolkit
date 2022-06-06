import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  API from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue,navigate ,toast }, { rejectWithValue }) => {
    try {
      const response = await API.post("/users/signin", formValue);
      toast.success("Login Successfully");
      // navigate("/dashboard");
      return response.data;
    } catch (err) {
      console.log('13', err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await  API.post("/users/signup", formValue);
      toast.success("Register Successfully");
      // navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);



const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    }
  },
});


export default authSlice.reducer;
