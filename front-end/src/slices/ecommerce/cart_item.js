/**
* This code contains functions for fetching, creating, and updating cart_items, as well as removing cart_items.
* It also includes error handling for when these functions fail.
*/
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../site/message";

import CartItemService from "services/ecommerce/cart_item.service";

export const get = createAsyncThunk(
   "cart_item/get",
   async ({ id }, thunkAPI) => {
       try {
           const response = await CartItemService.get(id);
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
   "cart_item/getAll",
   async (_, thunkAPI) => {
       try {
           const response = await CartItemService.getAll();
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
   "cart_item/create",
   async (data, thunkAPI) => {
        console.log(data);
       try {
           const response = await CartItemService.create(data);
           thunkAPI.dispatch(setMessage(response.data.message));
           console.log(response.data);
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
   "cart_item/update",
   async ({ id, data }, thunkAPI) => {
       try {
           const response = await CartItemService.update(id, data);
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
   "cart_item/remove",
   async ({ id }, thunkAPI) => {
       try {
           const response = await CartItemService.remove(id);
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
   "cart_item/removeAll",
   async (_, thunkAPI) => {
       try {
           const response = await CartItemService.removeAll();
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
   cart_items: null,
   fetched: false,
   fetching: false,
   currentCartItem: null
};

const commerceCategorySlice = createSlice({
   name: "cart_item",
   initialState,
   extraReducers: {
       [getAll.fulfilled]: (state, action) => {
           state.cart_items = action.payload;
           state.fetching = false;
           state.fetched = true;
       },
       [getAll.rejected]: (state, action) => {
           state.cart_items = [];
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
           state.cart_items.push(payload);
       },
       [create.rejected]: (state, action) => {
           console.log("update rejected");
       },
      
   },
});
const { reducer } = commerceCategorySlice;
export default reducer;