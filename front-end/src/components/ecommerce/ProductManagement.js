import React, { useState } from 'react';
import { Button, Card, Elevation, Classes, Dialog, FormGroup, InputGroup } from '@blueprintjs/core';
import ProductForm from './ProductForm';
import ProductList from './NewProductList'
const category_schema = {
  id: null,
  name: ""
}

const product_schema = {
  id: null,
  name: "",
  categories: "",
  images: "",
  description: "",
  price: "",
  variants: "",
}

const productList = [
  {
    id: 'product1',
    name: 'Laptop',
    description: 'Powerful laptop with high-end specifications.',
    price: '$1,200.00',
    image: 'laptop-image-url',
  },
  {
    id: 'product2',
    name: 'Smartphone',
    description: 'Feature-rich smartphone with the latest technology.',
    price: '$800.00',
    image: 'smartphone-image-url',
  },
  {
    id: 'product3',
    name: 'Headphones',
    description: 'High-quality over-ear headphones for immersive audio experience.',
    price: '$150.00',
    image: 'headphones-image-url',
  },
];

const displayParams = [
  { type: 'image', key: 'image' },
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
    // Implement logic to add a new category
    const newCategory = { category_id: categories.length + 1, name: categoryName };
    setCategories([...categories, newCategory]);
    setAddCategoryFormOpen(false);
    setCategoryName('');
  };

  const handleAddProductSubmit = () => {
    // Implement logic to add a new product
    const newProduct = { product_id: products.length + 1, name: productName };
    setProducts([...products, newProduct]);
    setAddProductFormOpen(false);
    setProductName('');
  };

  const handleAddTemplateSubmit = () => {
    // Implement logic to add a new template
    const newTemplate = { template_id: templates.length + 1, name: templateName };
    setTemplates([...templates, newTemplate]);
    setAddTemplateFormOpen(false);
    setTemplateName('');
  };

  return (
    <div>
      <h2>Product Dashboard</h2>

      {/* Categories Section */}
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
            categories.length == 0 && <div className="no-results">No Categories</div>
          }
        </ul>

        {/* Add Category Form */}
        <Dialog
          isOpen={isAddCategoryFormOpen}
          onClose={() => setAddCategoryFormOpen(false)}
          title="Add New Category"
        >
          {/* <div className={Classes.DIALOG_BODY}>
            <SaveObjectForm schema={currentProduct} header="" callBackFunction={updateProduct} />
          </div> */}
        </Dialog>
      </Card>

      {/* Products Section */}
      <Card className={`${Classes.ELEVATION_2} ecommerce-section`}>
        <div className="ecommerce-section-header">
          <h3>Products</h3>
          <Button intent="primary" onClick={handleAddProduct}>
            Add New Product
          </Button>
        </div>
        <div>
          {
            products.length == 0 ? (
              <div className="no-results">No Products</div>
            ) : (
              <ProductList productList={products} displayParams={displayParams} /> 
            )
          }
        </div>

        {/* Add Product Form */}
        <Dialog
          isOpen={isAddProductFormOpen}
          onClose={() => setAddProductFormOpen(false)}
          title="Add New Product"
        >
          <div className={Classes.DIALOG_BODY}>
            <ProductForm />
            {/* <FormGroup label="Product Name">
              <InputGroup
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </FormGroup>
            <div className="ecommerce-variations-section">
              <div className="ecommerce-section-header">
                <h3>Variations</h3>
                <Button intent="primary" onClick={handleAddTemplate}>
                  Add New Variation
                </Button>
              </div>
              <ul>
                {variations.map((variation) => (
                  <li key={variation.id}>{variation.name}</li>
                ))}
                {
                  variations.length == 0 && <div className="no-results">No Variations</div>
                }
              </ul>
            </div> */}
          </div>
          {/* <div className={Classes.DIALOG_FOOTER}>
            <Button onClick={handleAddProductSubmit} intent="primary">
              Add Product
            </Button>
          </div> */}
        </Dialog>
      </Card>

      {/* Templates Section */}
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
            templates.length == 0 && <div className="no-results">No Templates</div>
          }
        </ul>

        {/* Add Template Form */}
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
    </div>
  );
};

export default ProductManagementDashboard;
