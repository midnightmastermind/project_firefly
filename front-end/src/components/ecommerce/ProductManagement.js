import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Classes } from '@blueprintjs/core';
import ProductListWithPanelStack from './ProductListWithPanelStack';
import CategoryListWithPanelStack from './CategoryListWithPanelStack'; // Add the actual import path
import TemplateListWithPanelStack from './TemplateListWithPanelStack'; // Add the actual import path
import SettingsDrawer from 'components/navigation/SettingsDrawer'; // Adjust the import path accordingly

const category_schema = {
  id: null,
  name: ""
};

const product_schema = {
  id: null,
  name: "",
  categories: "",
  images: "",
  description: "",
  price: "",
  variants: "",
};


const displayParams = [
  { type: 'text', key: 'name' },
  { type: 'content', key: 'description' },
  { type: 'text', key: 'price' },
];

const ProductManagementDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [productList, setProductList] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [variations, setVariations] = useState([]);
  const { products } = useSelector(state => state.product);


  useEffect(() => {
    console.log(products);
    if (products) {
      setProductList(products);
    }
  }, [products]);

  return (
    <div>
      <h2>Product Dashboard</h2>
      <SettingsDrawer menuItems={[
        {
          id: 'categories_section',
          label: 'Categories',
          panel: (
            <Card className={`${Classes.ELEVATION_2} ecommerce-section`}>
              <div className="ecommerce-section-header">
                <h3>Categories</h3>
              </div>
              <CategoryListWithPanelStack categoryList={categories} setCategories={setCategories} />
            </Card>
          ),
        },
        {
          id: 'products_section',
          label: 'Products',
          panel: (
            <Card className={`${Classes.ELEVATION_2} ecommerce-section`}>
              <div className="ecommerce-section-header">
                <h3>Products</h3>
              </div>
              <ProductListWithPanelStack productList={productList} displayParams={displayParams} />
            </Card>
          ),
        },
        {
          id: 'templates_section',
          label: 'Product Templates',
          panel: (
            <Card className={`${Classes.ELEVATION_2} ecommerce-section`}>
              <div className="ecommerce-section-header">
                <h3>Product Templates</h3>
              </div>
              <TemplateListWithPanelStack templateList={templates} setTemplates={setTemplates} />
            </Card>
          ),
        },
      ]} />
    </div>
  );
};

export default ProductManagementDashboard;
