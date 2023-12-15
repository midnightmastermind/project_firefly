/**
 * This code contains functions for fetching, creating, and updating site_objects, as well as removing site_objects.
 * It also includes error handling for when these functions fail.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../site/message";

import SiteObjectService from "../../services/site_building/site_object.service";

export const get = createAsyncThunk(
    "site_object/get",
    async ({ id }, thunkAPI) => {
        try {
            const response = await SiteObjectService.get(id);
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
    "site_object/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await SiteObjectService.getAll();
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
    "site_object/create",
    async (data, thunkAPI) => {
        try {
            console.log("create site_object");
            console.log(data);
            const response = await SiteObjectService.create(data);
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
    "site_object/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await SiteObjectService.update(id, data);
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
    "site_object/remove",
    async ({ id }, thunkAPI) => {
        try {
            const response = await SiteObjectService.remove(id);
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
    "site_object/removeAll",
    async (_, thunkAPI) => {
        try {
            const response = await SiteObjectService.removeAll();
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
    site_objects: [],
    fetched: false,
    fetching: false
};

const siteObjectSlice = createSlice({
    name: "site_object",
    initialState,
    extraReducers: {
        [getAll.fulfilled]: (state, action) => {
            state.site_objects = action.payload;
            state.fetching = false;
            state.fetched = true;
        },
        [getAll.rejected]: (state, action) => {
            state.site_objects = [];
            state.fetching = false;
            state.fetched = true;
        },
        [getAll.pending]: (state, action) => {
            state.fetching = true;
            state.fetched = false;
        },
        [get.fulfilled]: (state, action) => {
            // const payload = action.payload;
            // const site_objects = state.site_objects;
        },
        [get.rejected]: (state, action) => {
            console.log("get rejected");
        },
        [update.fulfilled]: (state, action) => {
            // const payload = action.payload;
            // const site_objects = state.site_objects;
            // state.site_objects = site_objects.map((site_object, index) => {
            //     return site_object.id === payload.id ? payload : site_object;
            // });
        },
        [update.rejected]: (state, action) => {
            console.log("update rejected");
        },
        [create.fulfilled]: (state, action) => {
            const payload = action.payload;
            state.site_objects.push(payload);
        },
        [create.rejected]: (state, action) => {
            console.log("update rejected");
        },
       
    },
});
const { reducer } = siteObjectSlice;
export default reducer;