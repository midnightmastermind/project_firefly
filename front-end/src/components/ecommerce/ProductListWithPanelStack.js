import React, { useState, useEffect, useMemo } from 'react';
import { Button, Classes } from '@blueprintjs/core';
import ProductForm from './NewProductForm';
import { PanelStack2 } from '@blueprintjs/core';
import DynamicForm from 'components/form/Form';
import Pagination from 'components/common/Pagination';
import SearchBar from 'components/common/SearchBar';
import LoadingBar from 'components/common/LoadingBar';
import Carousel from 'components/elements/Carousel';

const Product = ({ data, onProductClick }) => {
  const getFieldByName = (name) => {
    const field = data.fields.find((f) => f.name === name);
    return field ? field.value : null;
  };

  const images = getFieldByName('images', 'value');
  const imagesArray = images.map(image => {
      return {
          type: 'image',
          src: image
      }
  });


  const image = (
    <div className="product-image"><Carousel items={imagesArray} /></div>//style={{ backgroundImage: `url(${getFieldByName('images')[0]})` }} />
  );

  return (
    <div className="product-card">
      {image}
      <div className="product-info">
        <DynamicForm
          schema={data.fields.map((field) => ({
            ...field,
            editable: false,
            label: field.label || field.name,
          }))}
          data={data}
          title={data.name}
          soloSave={true}
          noSave={true}
          callbackFunction={(formData) => console.log(formData)}
        />
      </div>
      <div className="view-button">
        <Button onClick={() => onProductClick(data)} style={{ marginLeft: '10px', cursor: 'pointer' }}>
          View
        </Button>
      </div>
    </div>
  );
};

const PageSize = 10;

const ProductListWithPanelStack = ({ productList, displayParams }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoadingBar, setShowLoadingBar] = useState(true);
  const [currentPanelStack, setCurrentPanelStack] = useState([]);

  const searchFields = ["name", "description"];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    addToPanelStack({
      renderPanel: () => <ProductForm productData={product} />,
    });
  };

  useEffect(() => {
    setSearchData(productList);
    setFilteredProducts(productList);
    setShowLoadingBar(false);
  }, [productList]);

  const addToPanelStack = (panel) => {
    setCurrentPanelStack((prevStack) => [...prevStack, panel]);
  };

  const removeFromPanelStack = () => {
    setCurrentPanelStack((prevStack) => prevStack.slice(0, -1));
  };

  const findByTitle = (products) => {
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  const currentProductList = useMemo(() => {
    if (filteredProducts !== null) {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return filteredProducts.slice(firstPageIndex, lastPageIndex);
    }
  }, [currentPage, filteredProducts]);

  const ProductPanelStack = () => {
    const handleBackClick = () => {
      removeFromPanelStack(); // Remove the top panel from the stack
      setSelectedProduct(null); // Clear the selected product
    };

    return (
      // <div>
      //   <PanelStack2
      //     className="docs-panel-stack-example"
      //     onOpen={addToPanelStack}
      //     onClose={removeFromPanelStack}
      //     renderActivePanelOnly={true}
      //     stack={currentPanelStack}
      //   />
      //   <div className={Classes.DIALOG_FOOTER}>
      //     <Button onClick={removeFromPanelStack}>Back to List</Button>
      //   </div>
      // </div>
      <PanelStack2
        className="product-panel-stack"
        onOpen={addToPanelStack}
        onClose={handleBackClick}
        renderPanelHeader={true}
        renderActivePanelOnly={true}
        stack={currentPanelStack}
      />
    );
  };
  console.log(selectedProduct);
  console.log(currentPanelStack);
  return (
    <div className="product-panel-list">
      <Button
        onClick={() => {
          setSelectedProduct(null);
          addToPanelStack({
            renderPanel: () => <ProductForm productData={{}} />,
            title: 'Add New Product',
          });
        }}
      >
        Add Product
      </Button>
      <SearchBar callBackFunction={findByTitle} fields={searchFields} data={searchData} />
      {showLoadingBar ? (<LoadingBar />) :
        (
          currentProductList &&
          <>
            <div className="product-list">
              {
                currentProductList.length > 0 ? (
                  currentProductList.map((product, index) => (
                    <Product key={product._id} data={product} onProductClick={handleProductClick} />
                  ))
                ) : (<div className="no-results">No Products Found</div>)
              }
            </div>
            <div className="flex justify-center items-center w-full">
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={filteredProducts.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
              />
            </div>
          </>
        )
      }
      {selectedProduct && <ProductPanelStack />}
    </div>
  );
};

export default ProductListWithPanelStack;
