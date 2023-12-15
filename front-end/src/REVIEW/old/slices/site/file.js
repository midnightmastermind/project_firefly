/**
 * This code contains functions for fetching, creating, and updating files, as well as removing files.
 * It also includes error handling for when these functions fail.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../site/message";

import FileService from "../../services/site/file.service";

export const get = createAsyncThunk(
    "file/get",
    async ({ id }, thunkAPI) => {
        try {
            const response = await FileService.get(id);
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
    "file/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await FileService.getAll();
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
    "file/create",
    async (data, thunkAPI) => {
        try {
            console.log("create file");
            console.log(data);
            const response = await FileService.create(data);
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
    "file/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await FileService.update(id, data);
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
    "file/remove",
    async ({ id }, thunkAPI) => {
        try {
            const response = await FileService.remove(id);
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
    "file/removeAll",
    async (_, thunkAPI) => {
        try {
            const response = await FileService.removeAll();
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
    files: [],
    fetched: false,
    fetching: false
};

const fileSlice = createSlice({
    name: "file",
    initialState,
    extraReducers: {
        [getAll.fulfilled]: (state, action) => {
            state.files = action.payload;
            state.fetching = false;
            state.fetched = true;
        },
        [getAll.rejected]: (state, action) => {
            state.files = [];
            state.fetching = false;
            state.fetched = true;
        },
        [getAll.pending]: (state, action) => {
            state.fetching = true;
            state.fetched = false;
        },
        [get.fulfilled]: (state, action) => {
            // const payload = action.payload;
            // const files = state.files;
        },
        [get.rejected]: (state, action) => {
            console.log("get rejected");
        },
        [update.fulfilled]: (state, action) => {
            // const payload = action.payload;
            // const files = state.files;
            // state.files = files.map((file, index) => {
            //     return file.id === payload.id ? payload : file;
            // });
        },
        [update.rejected]: (state, action) => {
            console.log("update rejected");
        },
        [create.fulfilled]: (state, action) => {
            const payload = action.payload;
            state.files.push(payload);
        },
        [create.rejected]: (state, action) => {
            console.log("update rejected");
        },
       
    },
});
const { reducer } = fileSlice;
export default reducer;