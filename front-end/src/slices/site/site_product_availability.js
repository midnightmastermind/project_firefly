/**
 * This code imports the createSlice and createAsyncThunk functions from the '@reduxjs/toolkit' library.
 * It also imports the setMessage function from the './message' file.
 * The code then creates three constants - get, getAll, and create - using the createAsyncThunk
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import SiteProductAvailabilityService from "../../services/site/site_product_availability.service";

export const get = createAsyncThunk(
    "site_product_availability/get",
    async ({ id }, thunkAPI) => {
        try {
            const response = await SiteProductAvailabilityService.get(id);
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
    "site_product_availability/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await SiteProductAvailabilityService.getAll();
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
    "site_product_availability/create",
    async (data, thunkAPI) => {
        try {
            const response = await SiteProductAvailabilityService.create(data);
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
    "site_product_availability/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await SiteProductAvailabilityService.update(id, data);
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
    "site_product_availability/remove",
    async ({ id }, thunkAPI) => {
        try {
            const response = await SiteProductAvailabilityService.remove(id);
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

// export const removeAll = createAsyncThunk(
// "site_product_availability/removeAll",
// async ({ }, thunkAPI) => {
//     try {
//     const response = await SiteProductAvailabilityService.removeAll();
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

const initialState = { site_product_availability: [] };

const siteProductAvailabilitySlice = createSlice({
    name: "site_product_availability",
    initialState,
    extraReducers: {
        [getAll.fulfilled]: (state, action) => {
            state.site_product_availability = action.payload;
        },
        [getAll.rejected]: (state, action) => {
            state.site_product_availability = [];
        },
        [create.fulfilled]: (state, action) => {
            state.site_product_availability.push(action.payload);
        },
        [create.rejected]: (state, action) => {
            console.log("create rejected");
        },
        [remove.fulfilled]: (state, action) => {
            state.site_product_availability = state.site_product_availability.map((product_availability, index) => {
                if (product_availability._id != action.payload) {
                    return product_availability;
                }
            });
        },
        [remove.rejected]: (state, action) => {
            console.log("remove rejected");
        },
    },
});
const { reducer } = siteProductAvailabilitySlice;
export default reducer;