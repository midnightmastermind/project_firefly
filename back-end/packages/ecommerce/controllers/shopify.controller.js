  // Emit Shopify orders when a client requests them
  socket.on('getShopifyOrders', async () => {
    try {
      // Fetch latest Shopify orders
      const orders = await shopify.order.list();

      // Update MongoDB database (save or update orders)
      await ShopifyOrder.insertMany(orders, { ordered: false, rawResult: true });

      // Emit updated Shopify orders to the client
      io.emit('shopifyOrders', orders);
    } catch (error) {
      console.error(error);
    }
  });

  // Emit Shopify products when a client requests them
  socket.on('getShopifyProducts', async () => {
    try {
      // Fetch latest Shopify products
      const products = await shopify.product.list();

      // Update MongoDB database (save or update products)
      await ShopifyProduct.insertMany(products, { ordered: false, rawResult: true });

      // Emit updated Shopify products to the client
      io.emit('shopifyProducts', products);
    } catch (error) {
      console.error(error);
    }
  });