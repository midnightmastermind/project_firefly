import React, { useState } from 'react';
import { Button, Card, Classes, Dialog, FormGroup, InputGroup } from '@blueprintjs/core';
import ProductForm from './ProductForm';
import ProductList from './NewProductList';
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

const productList = [
  {
    id: 'product1',
    name: 'Laptop',
    description: 'Powerful laptop with high-end specifications.',
    price: '$1,200.00',
    image: 'https://i.pcmag.com/imagery/reviews/01DwPnq2ew5930qO5p4LXWH-1..v1677608790.jpg',
  },
  {
    id: 'product2',
    name: 'Smartphone',
    description: 'Feature-rich smartphone with the latest technology.',
    price: '$800.00',
    image: 'https://cdn.thewirecutter.com/wp-content/media/2023/10/smartphone-2048px-4861.jpg?auto=webp&quality=75&width=1024',
  },
  {
    id: 'product3',
    name: 'Headphones',
    description: 'High-quality over-ear headphones for an immersive audio experience.',
    price: '$150.00',
    image: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2022/09/headphone-commute-hearing-loss-header-1024x575.jpg',
  },
];

const displayParams = [
  { type: 'text', key: 'name' },
  { type: 'content', key: 'description' },
  { type: 'text', key: 'price' },
];

const ProductManagementDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState(productList);
  const [templates, setTemplates] = useState([]);
  const [variations, setVariations] = useState([]);

  const [isAddCategoryFormOpen, setAddCategoryFormOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const [isAddProductFormOpen, setAddProductFormOpen] = useState(false);
  const [productName, setProductName] = useState('');

  const [isAddTemplateFormOpen, setAddTemplateFormOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');

  const handleAddCategory = () => {
    setAddCategoryFormOpen(true);
  };

  const handleAddProduct = () => {
    setAddProductFormOpen(true);
  };

  const handleAddTemplate = () => {
    setAddTemplateFormOpen(true);
  };

  const handleAddCategorySubmit = () => {
    const newCategory = { category_id: categories.length + 1, name: categoryName };
    setCategories([...categories, newCategory]);
    setAddCategoryFormOpen(false);
    setCategoryName('');
  };

  const handleAddProductSubmit = () => {
    const newProduct = { product_id: products.length + 1, name: productName };
    setProducts([...products, newProduct]);
    setAddProductFormOpen(false);
    setProductName('');
  };

  const handleAddTemplateSubmit = () => {
    const newTemplate = { template_id: templates.length + 1, name: templateName };
    setTemplates([...templates, newTemplate]);
    setAddTemplateFormOpen(false);
    setTemplateName('');
  };

  const menuItems = [
    {
      id: "options_label",
      label: "options"
    },
    {
      id: 'categories_section',
      label: 'Categories',
      panel: (
        <Card className={`${Classes.ELEVATION_2} ecommerce-section`}>
          <div className="ecommerce-section-header">
            <h3>Categories</h3>
            <Button intent="primary" onClick={handleAddCategory}>
              Add New Category
            </Button>
          </div>
          <ul>
            {categories.map((category) => (
              <li key={category.category_id}>{category.name}</li>
            ))}
            {
              categories.length === 0 && <div className="no-results">No Categories</div>
            }
          </ul>
          <Dialog
            isOpen={isAddCategoryFormOpen}
            onClose={() => setAddCategoryFormOpen(false)}
            title="Add New Category"
          >
            {/* Add Category Form Content */}
          </Dialog>
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
            <Button intent="primary" onClick={handleAddProduct}>
              Add New Product
            </Button>
          </div>
          <div>
            {
              products.length === 0 ? (
                <div className="no-results">No Products</div>
              ) : (
                <ProductList productList={products} displayParams={displayParams} />
              )
            }
          </div>
          <Dialog
            isOpen={isAddProductFormOpen}
            onClose={() => setAddProductFormOpen(false)}
            title="Add New Product"
          >
            <div className={Classes.DIALOG_BODY}>
              <ProductForm />
            </div>
          </Dialog>
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
            <Button intent="primary" onClick={handleAddTemplate}>
              Add New Template
            </Button>
          </div>
          <ul>
            {templates.map((template) => (
              <li key={template.template_id}>{template.name}</li>
            ))}
            {
              templates.length === 0 && <div className="no-results">No Templates</div>
            }
          </ul>
          <Dialog
            isOpen={isAddTemplateFormOpen}
            onClose={() => setAddTemplateFormOpen(false)}
            title="Add New Template"
          >
            <div className={Classes.DIALOG_BODY}>
              <FormGroup label="Template Name">
                <InputGroup
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                />
              </FormGroup>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <Button onClick={handleAddTemplateSubmit} intent="primary">
                Add Template
              </Button>
            </div>
          </Dialog>
        </Card>
      ),
    },
  ];

  return (
    <div>
      <h2>Product Dashboard</h2>
      <SettingsDrawer menuItems={menuItems} />
    </div>
  );
};

export default ProductManagementDashboard;
