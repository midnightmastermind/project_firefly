/**
 * This code contains functions for fetching, creating, and updating bookings, as well as removing bookings.
 * It also includes error handling for when these functions fail.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../site/message";

import BookingService from "services/scheduling/booking.service";

export const get = createAsyncThunk(
    "booking/get",
    async ({ id }, thunkAPI) => {
        try {
            const response = await BookingService.get(id);
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
    "booking/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await BookingService.getAll();
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
    "booking/create",
    async ({data}, thunkAPI) => {
        try {
            const response = await BookingService.create({data});
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
    "booking/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await BookingService.update(id, data);
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
    "booking/remove",
    async ({ id }, thunkAPI) => {
        try {
            const response = await BookingService.remove(id);
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
    "booking/removeAll",
    async (_, thunkAPI) => {
        try {
            const response = await BookingService.removeAll();
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
    bookings: null,
    fetched: false,
    fetching: false,
    currentBooking: null
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    extraReducers: {
        [getAll.fulfilled]: (state, action) => {
            state.bookings = action.payload;
            state.fetching = false;
            state.fetched = true;
        },
        [getAll.rejected]: (state, action) => {
            state.bookings = [];
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
            state.bookings.push(payload);
        },
        [create.rejected]: (state, action) => {
            console.log("update rejected");
        },
       
    },
});
const { reducer } = bookingSlice;
export default reducer;