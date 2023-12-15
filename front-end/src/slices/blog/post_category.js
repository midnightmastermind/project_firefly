/**
 * This code contains functions for fetching, creating, and updating post_categorys, as well as removing post_categorys.
 * It also includes error handling for when these functions fail.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../site/message";

import PostCategoryService from "services/blog/post_category.service";

export const get = createAsyncThunk(
    "post_category/get",
    async ({ id }, thunkAPI) => {
        try {
            const response = await PostCategoryService.get(id);
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
    "post_category/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await PostCategoryService.getAll();
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
    "post_category/create",
    async ({data}, thunkAPI) => {
        try {
            const response = await PostCategoryService.create({data});
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
    "post_category/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await PostCategoryService.update(id, data);
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
    "post_category/remove",
    async ({ id }, thunkAPI) => {
        try {
            const response = await PostCategoryService.remove(id);
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
    "post_category/removeAll",
    async (_, thunkAPI) => {
        try {
            const response = await PostCategoryService.removeAll();
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
    post_categorys: null,
    fetched: false,
    fetching: false,
    currentPostCategory: null
};

const postCategorySlice = createSlice({
    name: "post_category",
    initialState,
    extraReducers: {
        [getAll.fulfilled]: (state, action) => {
            state.post_categorys = action.payload;
            state.fetching = false;
            state.fetched = true;
        },
        [getAll.rejected]: (state, action) => {
            state.post_categorys = [];
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
            state.post_categorys.push(payload);
        },
        [create.rejected]: (state, action) => {
            console.log("update rejected");
        },
       
    },
});
const { reducer } = postCategorySlice;
export default reducer;