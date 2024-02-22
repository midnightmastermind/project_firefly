/**
 * This code is a react component that renders a list of products.
 * The products are fetched from the redux store.
 * The component has several helper functions to filter the products based on different criteria.
 */
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { create as createEnrollment } from "slices/scheduling/enrollment";
import { create as createSiteProductAvailability, remove as removeSiteProductAvailability } from "slices/site/site_product_availability";

import { Link } from "react-router-dom";
import PageAuth from "common/PageAuth";
import { belongsToSite } from "common/Site";
import LoadingBar from "components/common/LoadingBar";
import { filterProducts } from "common/Product";
import Hero from "components/elements/Hero";
import SearchBar from "components/common/SearchBar";
import LazyImage from "components/common/LazyImage";
import Pagination from "components/common/Pagination";
// import ToolBar from "navigation/ToolBar";
import Card from "components/ecommerce/Card";
import { Tag, Overlay2, Classes } from "@blueprintjs/core";
import ProductComponent from "./ProductComponent";
const searchFields = ["Name", "description"];


const Product = ({ product, onProductClick }) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  
    const getFieldByName = (name) => {
      const field = product.fields.find((f) => f.name === name);
      return field ? field.value : null;
    };
  
    const image = (
      <div className="product-image" style={{ backgroundImage: `url(${getFieldByName('images')[0]})` }} />
    );
  
    const salePrice = getFieldByName('sale_price');
    const regularPrice = getFieldByName('regular_price');
    const price = salePrice ? (
      <span className="sale-tag">
        <span style={{ color: 'red', textDecoration: 'line-through' }}>{`${formatter.format(regularPrice)}`}</span>
        {`${formatter.format(salePrice)}`}
      </span>
    ) : (
      <span>{`${formatter.format(regularPrice)}`}</span>
    );
  
    const content = (
      <div className="product-component-container" onClick={() => onProductClick(product)}>
        <div className="product-image-container">{image}</div>
        <div className="product-header-container">
          <div className="product-header">{getFieldByName('name')}</div>
          <div className="product-price">
            <Tag>{price}</Tag>
          </div>
        </div>
      </div>
    );
  
    return <Card element={product} content={content} />;
  };
  

const ProductList = (props) => {
    const [showLoadingBar, setShowLoadingBar] = useState(true);
    const [showSuperUserTools, setShowSuperUserTools] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [showSiteAdminTools, setShowSiteAdminTools] = useState(false);
    const [showGlobalAdminTools, setShowGlobalAdminTools] = useState(false);
    const [toolList, setToolList] = useState(null);
    const [currentSite, setCurrentSite] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openProductOverlay = (product) => {
      setSelectedProduct(product);
    };
  
    const closeProductOverlay = () => {
      setSelectedProduct(null);
    };

    const { products } = useSelector(state => state.product);
    const { user: currentUser } = useSelector((state) => state.auth);
    const { enrollments } = useSelector((state) => state.enrollment);
    const { product_permissions } = useSelector((state) => state.product_permissions);
    const { sites, current_site: site } = useSelector((state) => state.site);
    const { site_product_availability } = useSelector((state) => state.site_product_availability);
    const { fetched: fetchedProducts } = useSelector((state) => state.product);

    const dispatch = useDispatch();

    let PageSize = 32;

    const heroPageInfo = {
        image: 'http://localhost:8081/products.jpg',
        heading: 'Browse Products',
        search: false
    }


    useEffect(() => {
        if (filteredProducts !== null && fetchedProducts) {
            setShowLoadingBar(false);
        }
    }, [filteredProducts, fetchedProducts]);

    useEffect(() => {
        if (currentUser) {
            setShowSuperUserTools(PageAuth.superUserAuth(currentUser));
            setShowSiteAdminTools(PageAuth.adminAuth(currentUser));
            setShowGlobalAdminTools(PageAuth.globalAdminAuth(currentUser));
        }

        if (products) {
            let filtered = [];
            // let organized_products = organizeProducts(products);
            console.log(products);
            if (props.mode == "enrolled") {
                //filter to only enrolled
                filtered = filterProducts(products, enrollments, currentUser.id, 'user_id');
                setFilteredProducts(filtered);
                setSearchData(filtered);
            } else if (props.mode == "owned") {
                filtered = filterProducts(products, product_permissions, currentUser.id, 'user_id');
                setFilteredProducts(filtered);
                setSearchData(filtered);
            } else if (props.mode == "admin") {
                setFilteredProducts(products);
                setSearchData(products);
            } else if (props.mode == "global_admin") {
                setFilteredProducts(products);
                setSearchData(products);
            } else {
                setFilteredProducts(products);
                setSearchData(products);
            }
        }
    }, [dispatch, products, product_permissions, enrollments]);

    useEffect(() => {
        const toolList = [
            {
                type: "button",
                text: "Create New Product",
                icon: "fa-plus",
                class: "add-new-button",
                callBackOrLink: "/products/new"
            }];

        if (!props.site_id) {
            toolList.push({
                type: "select",
                text: "All Sites",
                callBackFunction: onChangeSite,
                options: sites,
                textIndex: "title"
            });
        }

        setToolList(toolList);
    }, [sites]);


    const findByTitle = (products) => {
        //refreshData();
        setFilteredProducts(products);
        setCurrentPage(1);
        //dispatch(searchByTitle({ searchTitle }));
    };

    const addToSite = (product_id) => {
        dispatch(createSiteProductAvailability({ product_id: product_id, site_id: currentSite }))
            .unwrap()
            .then(() => {
                //props.history.push("/products");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeFromSite = (product_id) => {
        dispatch(removeSiteProductAvailability({ product_id: product_id, site_id: currentSite }))
            .unwrap()
            .then(() => {
                //props.history.push("/products");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const currentProductList = useMemo(() => {
        if (filteredProducts !== null) {
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            return filteredProducts.slice(firstPageIndex, lastPageIndex);
        }
    }, [currentPage, filteredProducts]);


    const onChangeSite = (site) => {
        if (site !== "All") {
            setCurrentSite(site);
            let filtered = filterProducts(products, site_product_availability, site, 'site_id');
            setFilteredProducts(filtered);
            setSearchData(filtered);
        } else {
            setCurrentSite(null);
            setFilteredProducts(products);
            setSearchData(products);
        }
    }


    const display_params = [
        { type: 'text', key: 'name' },
        { type: 'content', key: 'short_description' },
        { type: 'text', key: 'product_price' },
      ];

    console.log(currentProductList);
    return (
        <div>
            {(props.mode !== "global_admin" && props.mode !== "admin") &&
                <>
                    <Hero page={heroPageInfo} />
                    <div className="flex text-center flex-wrap">
                        <div className="w-full flex-col">
                            <h2 className="text-6xl">Shop our amazing <span style={{ color: '#0093CB' }}>Products  </span></h2>
                            <p></p>
                        </div>
                    </div>
                </>
            }

            {/* {(showSuperUserTools || showSiteAdminTools || showGlobalAdminTools) && props.mode != "enrolled" &&
                <ToolBar toolList={toolList} />
            } */}
            <div className="product-list-container">
                <SearchBar callBackFunction={findByTitle} fields={searchFields} data={searchData} />
                {showLoadingBar ? (<LoadingBar />) :
                    (
                        currentProductList &&
                        <>
                            <div className="product-list">
                                {
                                    currentProductList.length > 0 ? (
                                        currentProductList.map((product, index) => {
                                            // {props.mode == "global_admin" && props.site_id && belongsToSite(product._id, props.site_id, site_product_availability, 'product_id') && (<button onClick={() => removeFromSite(product._id)} class="remove-from-site-card">Remove from Site</button>)}
                                            // {props.mode == "global_admin" && props.site_id && !belongsToSite(product._id, props.site_id, site_product_availability, 'product_id') && (<button onClick={() => addToSite(product._id)} class="add-to-site-card">Add To Site</button>)} */
                                            // if (product.availability == true) {
                                            // if (product.Type == "variable") {
                                                return <Product key={product._id} product={product} onProductClick={openProductOverlay} displayParams={display_params}/>
                                            // }
                                            // }
                                        })
                                    ) : (<div class="no-results">No Products Found</div>)
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
            </div>
            {selectedProduct && (
                <Overlay2
                isOpen={!!selectedProduct}
                onClose={closeProductOverlay}
                className={`${Classes.OVERLAY_SCROLL_CONTAINER}`}
                >
                <div className={`${Classes.ELEVATION_4} overlay-container `}>
                    <ProductComponent product={selectedProduct} />
                </div>
                </Overlay2>
      )}
        </div>

    );
}

export default ProductList;
