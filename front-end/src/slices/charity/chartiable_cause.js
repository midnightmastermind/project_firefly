/**
 * This code contains functions for fetching, creating, and updating charitable_causes, as well as removing charitable_causes.
 * It also includes error handling for when these functions fail.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../site/message";

import CharitableCauseService from "../../services/ecommerce/charitable_cause.service";

export const get = createAsyncThunk(
    "charitable_cause/get",
    async ({ id }, thunkAPI) => {
        try {
            const response = await CharitableCauseService.get(id);
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
    "charitable_cause/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await CharitableCauseService.getAll();
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
    "charitable_cause/getAllForSite",
    async (_, thunkAPI) => {
        try {
            const response = await CharitableCauseService.getAllForSite();
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
    "charitable_cause/create",
    async ({title, description, user_id}, thunkAPI) => {
        try {
            const response = await CharitableCauseService.create({title, description, user_id});
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
    "charitable_cause/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await CharitableCauseService.update(id, data);
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
    "charitable_cause/remove",
    async ({ id }, thunkAPI) => {
        try {
            const response = await CharitableCauseService.remove(id);
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
    "charitable_cause/removeAll",
    async (_, thunkAPI) => {
        try {
            const response = await CharitableCauseService.removeAll();
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
    charitable_causes: null,
    fetched: false,
    fetching: false,
    currentCharitableCause: null
};

const charitable_causeSlice = createSlice({
    name: "charitable_cause",
    initialState,
    extraReducers: {
        [getAll.fulfilled]: (state, action) => {
            state.charitable_causes = action.payload;
            state.fetching = false;
            state.fetched = true;
        },
        [getAll.rejected]: (state, action) => {
            state.charitable_causes = [];
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
            state.charitable_causes = action.payload;
            state.fetching = false;
            state.fetched = true;
        },
        [getAllForSite.rejected]: (state, action) => {
            state.charitable_causes = [];
            state.fetching = false;
            state.fetched = true;
        },
        [get.fulfilled]: (state, action) => {
            // const payload = action.payload;
            // const charitable_causes = state.charitable_causes;
        },
        [get.rejected]: (state, action) => {
            console.log("get rejected");
        },
        [update.fulfilled]: (state, action) => {
            // const payload = action.payload;
            // const charitable_causes = state.charitable_causes;
            // state.charitable_causes = charitable_causes.map((charitable_cause, index) => {
            //     return charitable_cause.id === payload.id ? payload : charitable_cause;
            // });
        },
        [update.rejected]: (state, action) => {
            console.log("update rejected");
        },
        [create.fulfilled]: (state, action) => {
            const payload = action.payload;
            state.charitable_causes.push(payload);
        },
        [create.rejected]: (state, action) => {
            console.log("update rejected");
        },
       
    },
});
const { reducer } = charitable_causeSlice;
export default reducer;