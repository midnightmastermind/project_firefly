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

import Carousel from "components/elements/Carousel";
import DynamicForm from "components/form/Form";
import List from "components/common/List";
import ProductForm from "./ProductForm";

const searchFields = ["Name", "description"];

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


    // useEffect(() => {
    //     if (filteredProducts !== null && fetchedProducts) {
    //         setShowLoadingBar(false);
    //     }
    // }, [filteredProducts, fetchedProducts]);

    // useEffect(() => {
    //     if (currentUser) {
    //         setShowSuperUserTools(PageAuth.superUserAuth(currentUser));
    //         setShowSiteAdminTools(PageAuth.adminAuth(currentUser));
    //         setShowGlobalAdminTools(PageAuth.globalAdminAuth(currentUser));
    //     }

    //     if (products) {
    //         let filtered = [];
    //         // let organized_products = organizeProducts(products);
    //         console.log(products);
    //         if (props.mode == "enrolled") {
    //             //filter to only enrolled
    //             filtered = filterProducts(products, enrollments, currentUser.id, 'user_id');
    //             setFilteredProducts(filtered);
    //             setSearchData(filtered);
    //         } else if (props.mode == "owned") {
    //             filtered = filterProducts(products, product_permissions, currentUser.id, 'user_id');
    //             setFilteredProducts(filtered);
    //             setSearchData(filtered);
    //         } else if (props.mode == "admin") {
    //             setFilteredProducts(products);
    //             setSearchData(products);
    //         } else if (props.mode == "global_admin") {
    //             setFilteredProducts(products);
    //             setSearchData(products);
    //         } else {
    //             setFilteredProducts(products);
    //             setSearchData(products);
    //         }
    //     }
    // }, [dispatch, products, product_permissions, enrollments]);

    // useEffect(() => {
    //     const toolList = [
    //         {
    //             type: "button",
    //             text: "Create New Product",
    //             icon: "fa-plus",
    //             class: "add-new-button",
    //             callBackOrLink: "/products/new"
    //         }];

    //     if (!props.site_id) {
    //         toolList.push({
    //             type: "select",
    //             text: "All Sites",
    //             callBackFunction: onChangeSite,
    //             options: sites,
    //             textIndex: "title"
    //         });
    //     }

    //     setToolList(toolList);
    // }, [sites]);


    const findByTitle = (products) => {
        //refreshData();
        setFilteredProducts(products);
        setCurrentPage(1);
        //dispatch(searchByTitle({ searchTitle }));
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

    const ProductListViewCard = ({ product }) => {
        const getFieldByName = (name) => {
            const field = product.fields.find((f) => f.name === name);
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
            <div className="product-list-view-card-image"><Carousel settings={{ showThumbs: false }} items={imagesArray} /></div>//style={{ backgroundImage: `url(${getFieldByName('images')[0]})` }} />
        );

        return (
            <div className="product-list-view-card-content">
                {image}
                <div className="product-list-view-card-info-container">
                    <DynamicForm
                        schema={product.fields.map((field) => ({
                            ...field,
                            editable: false,
                            label: field.label || field.name,
                        }))}
                        data={product}
                        title={product.name}
                        soloSave={true}
                        noSave={true}
                        callbackFunction={(formData) => console.log(formData)}
                    />
                </div>
            </div>
        );
    }

    const ProductGridViewCard = ({ product }) => {
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
            <div className="product-component-container">
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
    const display_params = [
        { type: 'text', key: 'name' },
        { type: 'content', key: 'short_description' },
        { type: 'text', key: 'product_price' },
    ];

    console.log(currentProductList);

    const overlayComponentAdmin = () => {

    }

    return (
        <div>
            {(props.mode !== "global_admin" && props.mode !== "admin") && !props.noHeroPage &&
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
                {products && (<List
                    items={products}
                    overlayComponent={(product) => <ProductComponent product={product} />}  // Pass the overlay component for products
                    filterFunction={findByTitle}
                    siteAvailability={site_product_availability}
                    searchFields={searchFields}
                    listViewItem={(product) => <ProductListViewCard product={product} />}
                    gridViewItem={(product) => <ProductGridViewCard product={product} />}
                    mode={props.mode}
                    adminOverlay={(product) => <ProductForm product={product} />}
                    listHeader="Product List"
                    isPanel={props.isPanel}
                />)
                }
            </div>
        </div>
    );
}

export default ProductList;
