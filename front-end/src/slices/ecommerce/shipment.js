/**
 * This code contains functions for fetching, creating, and updating shipments, as well as removing shipments.
 * It also includes error handling for when these functions fail.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../site/message";

import ShipmentService from "services/ecommerce/shipment.service";

export const get = createAsyncThunk(
    "shipment/get",
    async ({ id }, thunkAPI) => {
        try {
            const response = await ShipmentService.get(id);
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
    "shipment/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await ShipmentService.getAll();
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
    "shipment/create",
    async ({data}, thunkAPI) => {
        try {
            const response = await ShipmentService.create({data});
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
    "shipment/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await ShipmentService.update(id, data);
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
    "shipment/remove",
    async ({ id }, thunkAPI) => {
        try {
            const response = await ShipmentService.remove(id);
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
    "shipment/removeAll",
    async (_, thunkAPI) => {
        try {
            const response = await ShipmentService.removeAll();
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
    shipments: null,
    fetched: false,
    fetching: false,
    currentShipment: null
};

const shipmentSlice = createSlice({
    name: "shipment",
    initialState,
    extraReducers: {
        [getAll.fulfilled]: (state, action) => {
            state.shipments = action.payload;
            state.fetching = false;
            state.fetched = true;
        },
        [getAll.rejected]: (state, action) => {
            state.shipments = [];
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
            state.shipments.push(payload);
        },
        [create.rejected]: (state, action) => {
            console.log("update rejected");
        },
       
    },
});
const { reducer } = shipmentSlice;
export default reducer;