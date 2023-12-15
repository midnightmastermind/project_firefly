/**
 * This code imports the createSlice, createAsyncThunk, and setMessage functions from the @reduxjs/toolkit and product_permissions.service files.
 * It then sets up the get, getAll, getAllForUser, getAllForSite, create, update, and remove functions
 */


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../site/message";

import ProductPermissionsService from "../../services/ecommerce/product_permissions.service";

export const get = createAsyncThunk(
  "product_permissions/get",
  async ({ id }, thunkAPI) => {
    try {
      const response = await ProductPermissionsService.get(id);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getAll = createAsyncThunk(
  "product_permissions/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await ProductPermissionsService.getAll();
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getAllForUser = createAsyncThunk(
    "product_permissions/getAllForUser",
    async (_, thunkAPI) => {
      try {
        const response = await ProductPermissionsService.getAllForUser();
        return response.data;
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
      }
    }
  );

  export const getAllForSite = createAsyncThunk(
    "product_permissions/getAllForSite",
    async (_, thunkAPI) => {
      try {
        const response = await ProductPermissionsService.getAllForSite();
        return response.data;
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
      }
    }
  );
export const create = createAsyncThunk(
    "product_permissions/create",
    async (data, thunkAPI) => {
      try {
        const response = await ProductPermissionsService.create(data);
        thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
      }
    }
  );
  
  export const update = createAsyncThunk(
    "product_permissions/update",
    async ({ id, data }, thunkAPI) => {
      try {
        const response = await ProductPermissionsService.update(id, data);
        return response.data;
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
      }
    }
  );

//   export const remove = createAsyncThunk(
//     "product_permissions/remove",
//     async ({ id }, thunkAPI) => {
//       try {
//         const response = await ProductPermissionsService.remove(id);
//         thunkAPI.dispatch(setMessage(response.data.message));
//         return response.data;
//       } catch (error) {
//         const message =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
//         thunkAPI.dispatch(setMessage(message));
//         return thunkAPI.rejectWithValue();
//       }
//     }
//   );

// export const removeAll = createAsyncThunk(
// "product_permissions/removeAll",
// async ({ }, thunkAPI) => {
//     try {
//     const response = await ProductPermissionsService.removeAll();
//     thunkAPI.dispatch(setMessage(response.data.message));
//     return response.data;
//     } catch (error) {
//     const message =
//         (error.response &&
//         error.response.data &&
//         error.response.data.message) ||
//         error.message ||
//         error.toString();
//     thunkAPI.dispatch(setMessage(message));
//     return thunkAPI.rejectWithValue();
//     }
// }
// );

const initialState = {};

const productPermissionsSlice = createSlice({
    name: "product_permissions",
    initialState,
    extraReducers: {
      [getAll.fulfilled]: (state, action) => {
        state.product_permissions = action.payload;
      },
      [getAll.rejected]: (state, action) => {
        state.product_permissions = [];
      },
      [getAllForSite.fulfilled]: (state, action) => {
        state.product_permissions = action.payload;
      },
      [getAllForSite.rejected]: (state, action) => {
        state.product_permissions = [];
      },
      [getAllForUser.fulfilled]: (state, action) => {
        state.product_permissions = action.payload;
      },
      [getAllForUser.rejected]: (state, action) => {
        state.product_permissions = [];
      },
    },
  });
const { reducer } = productPermissionsSlice;
export default reducer;