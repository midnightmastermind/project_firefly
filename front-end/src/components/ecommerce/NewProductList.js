// ProductList.js
import React from 'react';
import { CardList } from '@blueprintjs/core';
import Product from './NewProduct';

const ProductList = ({ productList, displayParams }) => {
  return (
    <div>
      <CardList className="new-product-list">
        {Object.values(productList).map(product => (
          <Product key={product.id} data={product} displayParams={displayParams} />
        ))}
      </CardList>
    </div>
  );
};

export default ProductList;
