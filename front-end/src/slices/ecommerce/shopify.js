// src/features/shopifySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shopifyOrders: [],
  shopifyProducts: [],
};

const shopifySlice = createSlice({
  name: 'shopify',
  initialState,
  reducers: {
    setShopifyOrders: (state, action) => {
      state.shopifyOrders = action.payload;
    },
    setShopifyProducts: (state, action) => {
      state.shopifyProducts = action.payload;
    },
    // getShopifyOrders: async (dispatch) => {
    //   try {
    //     // Add logic to fetch Shopify orders from API or elsewhere
    //     const response = await fetch('your-api-endpoint-for-orders');
    //     const orders = await response.json();
    //     dispatch(setShopifyOrders(orders));
    //   } catch (error) {
    //     console.error('Error fetching Shopify orders:', error);
    //   }
    // },
    // getShopifyProducts: async (dispatch) => {
    //   try {
    //     // Add logic to fetch Shopify products from API or elsewhere
    //     const response = await fetch('your-api-endpoint-for-products');
    //     const products = await response.json();
    //     dispatch(setShopifyProducts(products));
    //   } catch (error) {
    //     console.error('Error fetching Shopify products:', error);
    //   }
    // },
  },
});

export const {
  setShopifyOrders,
  setShopifyProducts,
  // getShopifyOrders,
  // getShopifyProducts,
} = shopifySlice.actions;
export default shopifySlice.reducer;
