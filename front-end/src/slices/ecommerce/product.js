/**
 * This code contains functions for fetching, creating, and updating products, as well as removing products.
 * It also includes error handling for when these functions fail.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../site/message";

import ProductService from "../../services/ecommerce/product.service";

export const get = createAsyncThunk(
    "product/get",
    async ({ id }, thunkAPI) => {
        try {
            const response = await ProductService.get(id);
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
    "product/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await ProductService.getAll();
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

export const getAllForSite = createAsyncThunk(
    "product/getAllForSite",
    async (_, thunkAPI) => {
        try {
            const response = await ProductService.getAllForSite();
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
    "product/create",
    async ({title, description, user_id}, thunkAPI) => {
        try {
            const response = await ProductService.create({title, description, user_id});
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
    "product/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await ProductService.update(id, data);
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
    "product/remove",
    async ({ id }, thunkAPI) => {
        try {
            const response = await ProductService.remove(id);
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
    "product/removeAll",
    async (_, thunkAPI) => {
        try {
            const response = await ProductService.removeAll();
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
    products: null,
    fetched: false,
    fetching: false,
    currentProduct: null
};

const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers: {
        [getAll.fulfilled]: (state, action) => {
            state.products = action.payload;
            state.fetching = false;
            state.fetched = true;
        },
        [getAll.rejected]: (state, action) => {
            state.products = [];
            state.fetching = false;
            state.fetched = true;
        },
        [getAll.pending]: (state, action) => {
            state.fetching = true;
            state.fetched = false;
        },
        [getAllForSite.pending]: (state, action) => {
            state.fetching = true;
            state.fetched = false;
        },
        [getAllForSite.fulfilled]: (state, action) => {
            state.products = action.payload;
            state.fetching = false;
            state.fetched = true;
        },
        [getAllForSite.rejected]: (state, action) => {
            state.products = [];
            state.fetching = false;
            state.fetched = true;
        },
        [get.fulfilled]: (state, action) => {
            // const payload = action.payload;
            // const products = state.products;
        },
        [get.rejected]: (state, action) => {
            console.log("get rejected");
        },
        [update.fulfilled]: (state, action) => {
            // const payload = action.payload;
            // const products = state.products;
            // state.products = products.map((product, index) => {
            //     return product.id === payload.id ? payload : product;
            // });
        },
        [update.rejected]: (state, action) => {
            console.log("update rejected");
        },
        [create.fulfilled]: (state, action) => {
            const payload = action.payload;
            state.products.push(payload);
        },
        [create.rejected]: (state, action) => {
            console.log("update rejected");
        },
       
    },
});
const { reducer } = productSlice;
export default reducer;