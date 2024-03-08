import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Classes } from '@blueprintjs/core';
import ProductListWithPanelStack from './ProductListWithPanelStack';
import CategoryListWithPanelStack from './CategoryListWithPanelStack'; // Add the actual import path
import TemplateListWithPanelStack from './TemplateListWithPanelStack'; // Add the actual import path
import SettingsDrawer from 'components/navigation/SettingsDrawer'; // Adjust the import path accordingly
import ProductList from './ProductList';
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
      <SettingsDrawer className="product-management" menuItems={[
         {
          id: 'products_section',
          label: 'Products',
          panel: (
            <Card className={`${Classes.ELEVATION_2} ecommerce-section`}>
              {/* <ProductListWithPanelStack productList={productList} displayParams={displayParams} /> */}
              <ProductList isPanel={true} noHeroPage={true}/>
            </Card>
          ),
        },
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
          id: 'inventory_section',
          label: 'Inventory',
          panel: (
            <Card className={`${Classes.ELEVATION_2} ecommerce-section`}>
              <div className="ecommerce-section-header">
                <h3>Inventory</h3>
              </div>
            </Card>
          ),
        },
        {
          id: 'shipping_section',
          label: 'Shipping',
          panel: (
            <Card className={`${Classes.ELEVATION_2} ecommerce-section`}>
              <div className="ecommerce-section-header">
                <h3>Shipping</h3>
              </div>
            </Card>
          ),
        },
        {
          id: 'orders_section',
          label: 'Orders',
          panel: (
            <Card className={`${Classes.ELEVATION_2} ecommerce-section`}>
              <div className="ecommerce-section-header">
                <h3>Orders</h3>
              </div>
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
        {
          id: 'finances_section',
          label: 'Finances',
          panel: (
            <Card className={`${Classes.ELEVATION_2} ecommerce-section`}>
              <div className="ecommerce-section-header">
                <h3>Finance Settings</h3>
              </div>
              <TemplateListWithPanelStack templateList={templates} setTemplates={setTemplates} />
            </Card>
          ),
        },
        {
          id: 'marketing_section',
          label: 'Marketing',
          panel: (
            <Card className={`${Classes.ELEVATION_2} ecommerce-section`}>
              <div className="ecommerce-section-header">
                <h3>Marketing</h3>
              </div>
              <TemplateListWithPanelStack templateList={templates} setTemplates={setTemplates} />
            </Card>
          ),
        },
        {
          id: 'analytics_section',
          label: 'Analytics',
          panel: (
            <Card className={`${Classes.ELEVATION_2} ecommerce-section`}>
              <div className="ecommerce-section-header">
                <h3>Marketing</h3>
              </div>
              <TemplateListWithPanelStack templateList={templates} setTemplates={setTemplates} />
            </Card>
          ),
        },
        {
          id: 'properties_section',
          label: 'Properties',
          panel: (
            <Card className={`${Classes.ELEVATION_2} ecommerce-section`}>
              <div className="ecommerce-section-header">
                <h3>Properties</h3>
              </div>
            </Card>
          ),
        },
      ]} />
  );
};

export default ProductManagementDashboard;
