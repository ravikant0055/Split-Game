import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loginStatus: false,
  loginError: null,
  loginData: null,

  frameDataStatus: false,
  frameData: null,
  frameDataError: null,

};

// Async thunk for creating a page
export const loginAPI = createAsyncThunk('apidata/loginAPI',
  async (_, { rejectWithValue }) => {
    try {
      const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null ;
      if(userData){
        return userData ; 
      }
      console.log("login api call");
      const response = await axios.post('https://snap-box-backend.vercel.app/api/users/login', {
        name: 'snapbox1',
        password: 'snapbox@420',
      }
      );
      console.log("login api responce:",response.data);
      localStorage.setItem("token" , response.data.token) ; 
      localStorage.setItem("userData" , JSON.stringify(response.data))

      return response.data; 
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  }
);

// Async thunk for fetching frame details
export const fetchFrameData = createAsyncThunk('apidata/fetchFrameData',
  async (_,{ rejectWithValue }) => {
    try {
      const response = await axios.get('https://snap-box-backend.vercel.app/api/frames/all',
        { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }  }
      );
      console.log("frame api responce:",response.data);
      return response.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.message); 
    }
  }
);

// create slice for handling Frame State
const apiSlice = createSlice({
    name: 'apidata',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loginAPI.pending, (state) => {
          state.loginStatus = true;
          state.loginError = null;
        })
        .addCase(loginAPI.fulfilled, (state, action) => {
          state.loginStatus = false;
          state.loginData = action.payload.loginData; 
        })
        .addCase(loginAPI.rejected, (state, action) => {
          state.loginStatus = false;
          state.loginError = action.payload;
        })
        .addCase(fetchFrameData.pending, (state) => {
          state.frameDataStatus = true;
          state.frameData = null;
          state.frameDataError = null;
        })
        .addCase(fetchFrameData.fulfilled, (state, action) => {
          state.frameDataStatus = false;
          state.frameData = action.payload;
        })
        .addCase(fetchFrameData.rejected, (state, action) => {
          state.frameDataStatus = false;
          state.frameDataError = action.payload;
        })
    },
});

export default apiSlice.reducer;
  