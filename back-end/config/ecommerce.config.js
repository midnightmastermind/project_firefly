// config.js
module.exports = {
  shopify: {
    apiKey: process.env.SHOPIFY_API_KEY || 'your_shopify_api_key',
    apiPassword: process.env.SHOPIFY_API_PASSWORD || 'your_shopify_api_password',
    shopName: process.env.SHOPIFY_SHOP_NAME || 'your_shopify_shop_name',
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN || 'your_shopify_shop_name',
  },
  stripe: {
    apiKey: process.env.STRIPE_API_KEY || 'your_stripe_api_key',
  },
};
 