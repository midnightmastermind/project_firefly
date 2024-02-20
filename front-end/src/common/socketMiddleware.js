import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';
import socket from './socketConfig'; // Import the configured Socket.IO instance

const socketIOMiddleware = createSocketIoMiddleware(socket, 'server/'); // Replace 'server/' with your server namespace

export default socketIOMiddleware