// src/services/shopifyService.js
import {
  setShopifyOrders,
  setShopifyProducts,
  // getShopifyOrders,
  // getShopifyProducts,
} from 'slices/ecommerce/shopify';
import socket from 'common/socketConfig';

const configureSocket = (dispatch) => {
  // Shopify Orders
  socket.on('shopifyOrders', (orders) => {
    dispatch(setShopifyOrders(orders));
  });

  // Shopify Products
  socket.on('shopifyProducts', (products) => {
    dispatch(setShopifyProducts(products));
  });

  // Other Socket.IO events can be added here as needed
};

export const initializeShopifyService = (dispatch) => {
  // Fetch Shopify data right away
  // dispatch(setShopifyOrders());
  // dispatch(setShopifyProducts());
  socket.emit('getShopifyOrders');
  socket.emit('getShopifyProducts')
  configureSocket(dispatch);

  // Other setup logic can be added here
  // ...

  return () => {
    // Clean up, disconnect socket, etc.
    // ...
  };
};
  