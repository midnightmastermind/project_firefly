import React from 'react';
import CardList from '../elements/CardList';
import Product from './NewProduct';

const addContentWithProductComponent = (product, displayParams) => {
  return {
    ...product,
    content: <Product key={product.id} data={product} displayParams={displayParams} />,
  };
};

const ProductList = ({ productList, displayParams }) => {
  const productsWithContent = Object.values(productList).map(product =>
    addContentWithProductComponent(product, displayParams)
  );

  return (
    <div>
      <CardList data={productsWithContent} displayParams={displayParams} />
    </div>
  );
};

export default ProductList;
