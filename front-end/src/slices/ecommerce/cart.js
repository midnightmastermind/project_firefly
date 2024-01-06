/**
* This code contains functions for fetching, creating, and updating carts, as well as removing carts.
* It also includes error handling for when these functions fail.
*/
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../site/message";

import CartService from "services/ecommerce/cart.service";

export const get = createAsyncThunk(
   "cart/get",
   async ({ id }, thunkAPI) => {
       try {
           const response = await CartService.get(id);
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
   "cart/getAll",
   async (_, thunkAPI) => {
       try {
           const response = await CartService.getAll();
           return response.data;
       } catch (error) {
           console.log(error);
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
   "cart/create",
   async ({data}, thunkAPI) => {
       try {
           const response = await CartService.create({data});
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
   "cart/update",
   async ({ id, data }, thunkAPI) => {
       try {
           const response = await CartService.update(id, data);
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

export const remove = createAsyncThunk(
   "cart/remove",
   async ({ id }, thunkAPI) => {
       try {
           const response = await CartService.remove(id);
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

export const removeAll = createAsyncThunk(
   "cart/removeAll",
   async (_, thunkAPI) => {
       try {
           const response = await CartService.removeAll();
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

const initialState = {
   carts: null,
   fetched: false,
   fetching: false,
   currentCart: null
};

const commerceCategorySlice = createSlice({
   name: "cart",
   initialState,
   extraReducers: {
       [getAll.fulfilled]: (state, action) => {
           state.carts = action.payload;
           state.fetching = false;
           state.fetched = true;
       },
       [getAll.rejected]: (state, action) => {
           state.carts = [];
           state.fetching = false;
           state.fetched = true;
       },
       [getAll.pending]: (state, action) => {
           state.fetching = true;
           state.fetched = false;
       },
       [get.fulfilled]: (state, action) => {

       },
       [get.rejected]: (state, action) => {
           console.log("get rejected");
       },
       [update.fulfilled]: (state, action) => {

       },
       [update.rejected]: (state, action) => {
           console.log("update rejected");
       },
       [create.fulfilled]: (state, action) => {
           const payload = action.payload;
           state.carts.push(payload);
       },
       [create.rejected]: (state, action) => {
           console.log("update rejected");
       },
      
   },
});
const { reducer } = commerceCategorySlice;
export default reducer;