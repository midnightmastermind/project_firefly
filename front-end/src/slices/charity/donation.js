/**
 * This code contains functions for fetching, creating, and updating donations, as well as removing donations.
 * It also includes error handling for when these functions fail.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../site/message";

import DonationService from "../../services/ecommerce/donation.service";

export const get = createAsyncThunk(
    "donation/get",
    async ({ id }, thunkAPI) => {
        try {
            const response = await DonationService.get(id);
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
    "donation/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await DonationService.getAll();
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
    "donation/getAllForSite",
    async (_, thunkAPI) => {
        try {
            const response = await DonationService.getAllForSite();
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
    "donation/create",
    async ({title, description, user_id}, thunkAPI) => {
        try {
            const response = await DonationService.create({title, description, user_id});
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
    "donation/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await DonationService.update(id, data);
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
    "donation/remove",
    async ({ id }, thunkAPI) => {
        try {
            const response = await DonationService.remove(id);
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
    "donation/removeAll",
    async (_, thunkAPI) => {
        try {
            const response = await DonationService.removeAll();
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
    donations: null,
    fetched: false,
    fetching: false,
    currentDonation: null
};

const donationSlice = createSlice({
    name: "donation",
    initialState,
    extraReducers: {
        [getAll.fulfilled]: (state, action) => {
            state.donations = action.payload;
            state.fetching = false;
            state.fetched = true;
        },
        [getAll.rejected]: (state, action) => {
            state.donations = [];
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
            state.donations = action.payload;
            state.fetching = false;
            state.fetched = true;
        },
        [getAllForSite.rejected]: (state, action) => {
            state.donations = [];
            state.fetching = false;
            state.fetched = true;
        },
        [get.fulfilled]: (state, action) => {
            // const payload = action.payload;
            // const donations = state.donations;
        },
        [get.rejected]: (state, action) => {
            console.log("get rejected");
        },
        [update.fulfilled]: (state, action) => {
            // const payload = action.payload;
            // const donations = state.donations;
            // state.donations = donations.map((donation, index) => {
            //     return donation.id === payload.id ? payload : donation;
            // });
        },
        [update.rejected]: (state, action) => {
            console.log("update rejected");
        },
        [create.fulfilled]: (state, action) => {
            const payload = action.payload;
            state.donations.push(payload);
        },
        [create.rejected]: (state, action) => {
            console.log("update rejected");
        },
       
    },
});
const { reducer } = donationSlice;
export default reducer;