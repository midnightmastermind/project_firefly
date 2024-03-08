
import { createSlice, createAsyncThunk, combineReducers, configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import socket from "common/socketConfig";
import socketIOMiddleware from 'common/socketMiddleware';
import reducer from './store';

class DynamicStore {
  constructor(schemaNames, dispatch) {
    console.log("setup");
    this.schemaNames = schemaNames;
    this.socket = socket;
    this.socketEventListeners = {};
    this.combinedFeatures = this.combineDynamicFeatures();
    this.store = this.setupStore();
    this.setupAllSocketListeners();
  }

  getState() {
    return this.store.getState();
  }

  createActions(schemaName, customOperations) {

    const httpGetEndpoint = `/api/${schemaName.toLowerCase()}`;
    const socketEvent = `${schemaName.toLowerCase()}`;

    // ... (inside createCombinedSliceForSchema method)

    const defaultOperations = {
      // ... (other operations)
      readAll: createAsyncThunk(`${schemaName.toLowerCase()}-readAll`, async (_, thunkAPI) => {
        try {
          const socketEvent = `${schemaName.toLowerCase()}-readAll`;
      
          console.log(`Emitting Socket.IO event: ${socketEvent}`);
          socket.emit(socketEvent, null);
      
          // const handleSocketResponse = async (socketResponse) => {
          //   console.log(socketResponse);
        
          //   try {
          //     if (socketResponse) {
                // thunkAPI.dispatch({
                //   type: `${schemaName.toLowerCase()}/getAllEntities/fulfilled`,
                //   payload: socketResponse.data,
                // });
        
          //       // Disconnect the socket after receiving the response
          //       socket.disconnect();
        
          //       // Remove the event listener
          //       socket.off(`${socketEvent}-response`, handleSocketResponse);
        
          //       resolve(socketResponse);
          //     }
          //   } catch (error) {
          //     console.error(error.message);
          //   }
          // };?
          // // Listen for the server's response
          // socket.on(`${socketEvent}-response`, handleSocketResponse);
        } catch (socketError) {
          // If Socket.IO call fails, attempt HTTP call
          try {
            const response = await axios.post(httpGetEndpoint, {});
      
            // If HTTP call succeeds, update the state
            thunkAPI.dispatch({
              type: `${schemaName.toLowerCase()}/getAllEntities/fulfilled`,
              payload: response.data,
            });
      
            return response.data;
          } catch (httpError) {
            // If both Socket.IO and HTTP calls fail, reject with the error
            console.error("Socket and HTTP calls failed:", socketError, httpError);
            return thunkAPI.rejectWithValue(httpError.response.data);
          }
        }
      }),
      create: createAsyncThunk(`${schemaName.toLowerCase()}-create`, async ({ data }, thunkAPI) => {
        try {
          const socketEvent = `${schemaName.toLowerCase()}-create`;

          // Attempt Socket.IO call
          const socketResponse = await new Promise((resolve) => {
            socket.emit(socketEvent, data);

            // Listen for the server's response
            socket.on(`${socketEvent}-response`, (response) => {
              resolve(response);
            });
          });

          // If Socket.IO call succeeds, update the state
          thunkAPI.dispatch({
            type: `${schemaName.toLowerCase()}-create/fulfilled`,
            payload: socketResponse,
          });

          return socketResponse;
        } catch (socketError) {
          // If Socket.IO call fails, attempt HTTP call
          try {
            const response = await axios.post(httpGetEndpoint, data);

            // If HTTP call succeeds, update the state
            thunkAPI.dispatch({
              type: `${schemaName.toLowerCase()}-create/fulfilled`,
              payload: response.data,
            });

            return response.data;
          } catch (httpError) {
            // If both Socket.IO and HTTP calls fail, reject with the error
            console.error("Socket and HTTP calls failed:", socketError, httpError);
            return thunkAPI.rejectWithValue(httpError.response.data);
          }
        }
      }),
      read: createAsyncThunk(`${schemaName.toLowerCase()}-read`, async ({ id }, thunkAPI) => {
        try {
          const socketEvent = `${schemaName.toLowerCase()}-read`;

          // Attempt Socket.IO call
          const socketResponse = await new Promise((resolve) => {
            socket.emit(socketEvent, { id });

            // Listen for the server's response
            socket.on(`${socketEvent}-response`, (response) => {
              resolve(response);
            });
          });

          // If Socket.IO call succeeds, update the state
          thunkAPI.dispatch({
            type: `${schemaName.toLowerCase()}-read/fulfilled`,
            payload: socketResponse,
          });

          return socketResponse;
        } catch (socketError) {
          // If Socket.IO call fails, attempt HTTP call
          try {
            const response = await axios.get(`${httpGetEndpoint}/${id}`);

            // If HTTP call succeeds, update the state
            thunkAPI.dispatch({
              type: `${schemaName.toLowerCase()}-read/fulfilled`,
              payload: response.data,
            });

            return response.data;
          } catch (httpError) {
            // If both Socket.IO and HTTP calls fail, reject with the error
            console.error("Socket and HTTP calls failed:", socketError, httpError);
            return thunkAPI.rejectWithValue(httpError.response.data);
          }
        }
      }),

      update: createAsyncThunk(`${schemaName.toLowerCase()}-update`, async ({ id, data }, thunkAPI) => {
        try {
          const socketEvent = `${schemaName.toLowerCase()}-update`;

          // Attempt Socket.IO call
          const socketResponse = await new Promise((resolve) => {
            socket.emit(socketEvent, { id, data });

            // Listen for the server's response
            socket.on(`${socketEvent}-response`, (response) => {
              resolve(response);
            });
          });

          // If Socket.IO call succeeds, update the state
          thunkAPI.dispatch({
            type: `${schemaName.toLowerCase()}-update/fulfilled`,
            payload: socketResponse,
          });

          return socketResponse;
        } catch (socketError) {
          // If Socket.IO call fails, attempt HTTP call
          try {
            const response = await axios.put(`${httpGetEndpoint}/${id}`, data);

            // If HTTP call succeeds, update the state
            thunkAPI.dispatch({
              type: `${schemaName.toLowerCase()}-update/fulfilled`,
              payload: response.data,
            });

            return response.data;
          } catch (httpError) {
            // If both Socket.IO and HTTP calls fail, reject with the error
            console.error("Socket and HTTP calls failed:", socketError, httpError);
            return thunkAPI.rejectWithValue(httpError.response.data);
          }
        }
      }),

      delete: createAsyncThunk(`${schemaName.toLowerCase()}-delete`, async ({ id }, thunkAPI) => {
        try {
          const socketEvent = `${schemaName.toLowerCase()}-delete`;

          // Attempt Socket.IO call
          const socketResponse = await new Promise((resolve) => {
            socket.emit(socketEvent, { id });

            // Listen for the server's response
            socket.on(`${socketEvent}-response`, (response) => {
              resolve(response);
            });
          });

          // If Socket.IO call succeeds, update the state
          thunkAPI.dispatch({
            type: `${schemaName.toLowerCase()}-delete/fulfilled`,
            payload: socketResponse,
          });

          return socketResponse;
        } catch (socketError) {
          // If Socket.IO call fails, attempt HTTP call
          try {
            const response = await axios.delete(`${httpGetEndpoint}/${id}`);

            // If HTTP call succeeds, update the state
            thunkAPI.dispatch({
              type: `${schemaName.toLowerCase()}-delete/fulfilled`,
              payload: response.data,
            });

            return response.data;
          } catch (httpError) {
            // If both Socket.IO and HTTP calls fail, reject with the error
            console.error("Socket and HTTP calls failed:", socketError, httpError);
            return thunkAPI.rejectWithValue(httpError.response.data);
          }
        }
      }),
    };

        return {
          ...defaultOperations,
          ...customOperations,
        };
  }

  memoizedCreateAsyncThunk(type, payloadCreator) {
    if (!this.createAsyncThunkMemo[type]) {
      this.createAsyncThunkMemo[type] = createAsyncThunk(type, payloadCreator);
    }
    return this.createAsyncThunkMemo[type];
  }

  performOperation(schemaName, action, data, dispatch) {
    try {

      console.log(action);
      const actions = this.combinedFeatures.combinedActions[schemaName.toLowerCase()];

      console.log(actions);

      dispatch(actions[action]({ data }));
      // if (socketEventAction && socketToUse.connected) {
      //   dispatch(socketEventAction({ action, data }));
      // } else if (actions[action]) {
      //   dispatch(actions[action]({ data }));
      // } else {
      //   console.error(`Action ${action} does not exist.`);
      // }
    } catch (error) {
      console.error(error);
    }
  }

  combineDynamicFeatures() {
    const combinedSlices = {};
    const combinedReducers = {};
    const combinedActions = {};

    this.schemaNames.forEach((schema) => {
      try {
        // Dynamically import custom operations file for the schema
        const customOperationsPath = `./custofm/${schema.toLowerCase()}`;
        let customOperations = {};
        try {
          customOperations = require(customOperationsPath).default;
          // Continue with your logic
        } catch (error) {
          // Handle the case where the custom file doesn't exist
          //console.error(`Custom file for schema ${schema} not found. Default operations will be used.`);
          customOperations = {};
        }
        const actions = this.createActions(schema, customOperations);
        const slice = this.createSlices(schema, actions);


        combinedSlices[schema.toLowerCase()] = slice;
        combinedReducers[schema.toLowerCase()] = slice.reducer;
        combinedActions[schema.toLowerCase()] = actions;
      } catch (error) {
        console.error(`Error loading custom operations for schema ${schema}:`, error);
      }
    });



    return { combinedSlices, combinedReducers, combinedActions };
  }

  setupSocketListeners(schemaName, dispatch) {

    const defaultSocketEvents = [
      'read',
      'readAll',
      'create',
      'update',
      'delete'
    ];

    const schemaSocketEvents = {};
    defaultSocketEvents.forEach(socketEventName=> {
      const socketEvent = `${schemaName.toLowerCase()}-${socketEventName}`;
      schemaSocketEvents[socketEvent] = (socketResponse) => {
        this.handleSocketEvent(socketEvent, socketResponse, dispatch);
      };
    })

    // Add more socket event listeners as needed
    // ...

    return schemaSocketEvents;
  }

  handleSocketEvent(actionType, socketResponse, dispatch) {
    try {
      console.log(actionType);
      console.log(socketResponse);

      if (socketResponse) {
        dispatch({
          type: `${actionType}/fulfilled`,
          payload: socketResponse,
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  setupAllSocketListeners() {
    this.schemaNames.forEach((schema) => {
      const socketEventHandlers = this.setupSocketListeners(schema, this.store.dispatch);
      Object.entries(socketEventHandlers).forEach(([event, handler]) => {
        console.log(event);
        socket.on(`${event}-response`, (socketResponse) => handler(socketResponse));
      });
    });
  }

  createSlices(schemaName, operations) {
    const initialState = {
      data: null,
      fetched: false,
      fetching: false,
      currentEntity: null,
    };
    const slice = createSlice({
      name: `${schemaName.toLowerCase()}`,
      initialState,
      extraReducers: (builder) => {
        Object.entries(operations).forEach(([actionType, action]) => {
          if (action.fulfilled) {
            builder.addMatcher(
              (action) => (action.type.includes(`${schemaName.toLowerCase()}-readAll/fulfilled`)),
              (state, action) => {
                console.log(action);
                state.data = action.payload;
                state.fetching = false;
                state.fetched = true;
              }
            );
          } else if (action.rejected) {

            builder.addMatcher(
              (action) => action.type === action.rejected.type,
              (state) => {


                state.data = [];
                state.fetching = false;
                state.fetched = true;
              }
            );
          } else if (action.pending) {

            builder.addMatcher(
              (action) => action.type === action.pending.type,
              (state) => {


                state.fetching = true;
                state.fetched = false;
              }
            );
          }
        });
      },
    });

    return slice;
  }
  setupStore() {

    const { combinedReducers } = this.combinedFeatures;

    // Use combineReducers to combine your dynamic reducers with other reducers
    // const rootReducer = combineReducers({ ...reducer, ...combinedReducers });

    const rootReducer = combineReducers({ ...reducer, ...combinedReducers });
    return configureStore({
      reducer: rootReducer,
      devTools: true,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(socketIOMiddleware)
    });
  }
}

export default DynamicStore;