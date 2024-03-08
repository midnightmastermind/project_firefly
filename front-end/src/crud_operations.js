// crudService.js
import { socketEventAction } from './dynamic_store'; // Adjust the import path

const performCrudOperation = (dispatch, socket, actions) => async (action, data) => {
  try {
    // Check if Socket.IO connection is available
    if (socket.connected) {
      // Socket.IO connection is available, dispatch the socketEventAction
      await dispatch(socketEventAction({ action, data }));
    } else {
      // Socket.IO connection is not available, dispatch the corresponding HTTP action
      switch (action) {
        case 'create':
          await dispatch(actions.createEntity({ data }));
          break;

        case 'read':
          await dispatch(actions.getAll());
          break;

        case 'update':
          await dispatch(actions.updateEntity({ id: data._id, data }));
          break;

        case 'delete':
          await dispatch(actions.deleteEntity({ id: data._id }));
          break;

        default:
          // Handle other cases or do nothing
          break;
      }
    }
  } catch (error) {
    // Handle errors if needed
    console.error(error);
  }
};

export default performCrudOperation;
