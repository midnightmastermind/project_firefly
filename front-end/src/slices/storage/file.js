/**
 * This code contains functions for fetching, creating, and updating files, as well as removing files.
 * It also includes error handling for when these functions fail.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../site/message";

import FileService from "services/storage/file.service";

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

export const uploadFile = createAsyncThunk(
    "file/uploadFile",
    async ({folder_id, fileData, fileId, callbackFunction}, thunkAPI) => {
        console.log(folder_id);
        console.log(fileData);
        console.log(callbackFunction);
        try {
            console.log(folder_id);
            console.log(fileData);
            const response = await FileService.uploadFile(folder_id, fileData, fileId, callbackFunction);
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


export const getUploadProgress = createAsyncThunk(
    "file/getUploadProgress",
    async (fileId, thunkAPI) => {
        try {
            const response = await FileService.getUploadProgress(fileId);
            return response.data; // Adjust this according to your response structure
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
export const addToQueue = (data) => {
    // Assuming your initial state has a property called queue, which is an array
    return (dispatch) => {
        dispatch({ type: 'file/addToQueue', payload: data });
    };
};

export const removeFromQueue = (id) => {
    // Assuming your initial state has a property called queue, which is an array
    return (dispatch) => {
        dispatch({ type: 'file/removeFromQueue', payload: id });
    };
};
const initialState = {
    files: [],
    fetched: false,
    fetching: false,
    queue: []
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
        [uploadFile.fulfilled]: (state, action) => {
            // Handle successful file upload
            const uploadedFile = action.payload;
            // Update state accordingly, for example:
            state.files.push(uploadedFile.savedFile);
            state.uploading = false;
          },
          [uploadFile.rejected]: (state, action) => {
            // Handle file upload failure
            const error = action.error;
            // Update state accordingly, for example:
            state.error = error.message;
            state.uploading = false;
          },
          [uploadFile.pending]: (state, action) => {
            // Handle pending file upload
            // Update state accordingly, for example:
            console.log("hit");
            state.uploading = true;
          },
        [addToQueue.fulfilled]: (state, action) => {
            state.queue.push(action.payload);
        },
        [removeFromQueue.fulfilled]: (state, action) => {
            const index = state.queue.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                state.queue.splice(index, 1);
            }
        },
        [getUploadProgress.fulfilled]: (state, action) => {
            console.log(action);
            const { fileId, uploadProgress } = action.payload;
            const updatedFiles = state.files.map(file => {
                if (file.id === fileId) {
                    return {
                        ...file,
                        uploadProgress: uploadProgress
                    };
                }
                return file;
            });
            state.files = updatedFiles;
        },
    },
});
const { reducer } = fileSlice;
export default reducer;