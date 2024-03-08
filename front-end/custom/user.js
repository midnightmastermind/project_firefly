import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import socket from "common/socketConfig";

// Custom action to perform user login
export const loginUser = createAsyncThunk("user/loginUser", async ({ username, password }, thunkAPI) => {
  try {
    const socketEvent = "user-login";

    const socketResponse = await new Promise((resolve) => {
      socket.emit(socketEvent, { username, password });

      socket.on(`${socketEvent}-response`, (response) => {
        resolve(response);
      });
    });

    thunkAPI.dispatch({
      type: `user/loginUser/fulfilled`,
      payload: socketResponse,
    });

    return socketResponse;
  } catch (socketError) {
    try {
      const response = await axios.post("/api/user/loginUser", { username, password });

      thunkAPI.dispatch({
        type: `user/loginUser/fulfilled`,
        payload: response.data,
      });

      return response.data;
    } catch (httpError) {
      console.error("Socket and HTTP calls failed:", socketError, httpError);
      return thunkAPI.rejectWithValue(httpError.response.data);
    }
  }
});

// Custom action to perform user logout
export const logoutUser = createAsyncThunk("user/logoutUser", async (_, thunkAPI) => {
  try {
    const socketEvent = "user-logout";

    const socketResponse = await new Promise((resolve) => {
      socket.emit(socketEvent, null);

      socket.on(`${socketEvent}-response`, (response) => {
        resolve(response);
      });
    });

    thunkAPI.dispatch({
      type: `user/logoutUser/fulfilled`,
      payload: socketResponse,
    });

    return socketResponse;
  } catch (socketError) {
    try {
      const response = await axios.post("/api/user/logoutUser", {});

      thunkAPI.dispatch({
        type: `user/logoutUser/fulfilled`,
        payload: response.data,
      });

      return response.data;
    } catch (httpError) {
      console.error("Socket and HTTP calls failed:", socketError, httpError);
      return thunkAPI.rejectWithValue(httpError.response.data);
    }
  }
});

// Custom reducer action to handle user login
export const userLoginReducer = (state, action) => {
  // Handle the state change based on the action.payload
  return {
    ...state,
    user: {
      ...state.user,
      // Update state properties accordingly for login
      isLoggedIn: true,
      username: action.payload.username,
      // ... other user properties
    },
  };
};

// Custom reducer action to handle user logout
export const userLogoutReducer = (state, action) => {
  // Handle the state change based on the action.payload
  return {
    ...state,
    user: {
      ...state.user,
      // Update state properties accordingly for logout
      isLoggedIn: false,
      username: null,
      // ... other user properties
    },
  };
};

// Custom socket event to handle user login response
export const userLoginSocketEvent = (socketResponse, dispatch) => {
  try {
    dispatch({
      type: `user/loginUser/fulfilled`,
      payload: socketResponse,
    });
  } catch (error) {
    console.error(error.message);
  }
};

// Custom socket event to handle user logout response
export const userLogoutSocketEvent = (socketResponse, dispatch) => {
  try {
    dispatch({
      type: `user/logoutUser/fulfilled`,
      payload: socketResponse,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export default {
  customActions: {
    loginUser,
    logoutUser,
  },
  customReducers: {
    userLoginReducer,
    userLogoutReducer,
  },
  customSlices: {
    // You can add custom slices if needed
  },
  customSocketEvents: {
    userLoginSocketEvent,
    userLogoutSocketEvent,
  },
};