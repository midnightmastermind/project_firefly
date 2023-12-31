/**
 * This code is a react component that renders a list of products.
 * The products are fetched from the redux store.
 * The component has several helper functions to filter the products based on different criteria.
 */
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import "css/ProductList.css";

import { create as createEnrollment } from "slices/scheduling/enrollment";
import { create as createSiteProductAvailability, remove as removeSiteProductAvailability } from "slices/site/site_product_availability";

import { Link } from "react-router-dom";
import PageAuth from "common/PageAuth";
import { belongsToSite } from "common/Site";
import LoadingBar from "components/common/LoadingBar";
import { filterProducts } from "common/Product";
import Hero from "components/elements/Hero";
import SearchBar from "components/common/SearchBar";
import LazyImage from "components/common//LazyImage";
import Pagination from "components/common//Pagination";
// import ToolBar from "navigation/ToolBar";
import Card from "components/ecommerce/Card";
const searchFields = ["title", "description"];

const exampleData = [   {
    "name":"Cozy Knit Sweater",
    "category":[
       "Apparel",
       "Mens",
       "Sweaters"
    ],
    "variants":[
       {
          "description":"Warm and cozy knit sweater for chilly days",
          "size":"medium",
          "color":"green",
          "pattern":null,
          "images":[
             "https://example.com/sweater_green_medium.jpg"
          ],
          "price":49.99,
          "stock":12
       },
       {
        "description":"Warm and cozy knit sweater for chilly days",
        "size":"small",
        "color":"green",
        "pattern":null,
        "images":[
           "https://example.com/sweater_green_medium.jpg"
        ],
        "price":49.99,
        "stock":12
     },
       {
          "description":"Warm and cozy knit sweater for chilly days",
          "size":"small",
          "color":"blue",
          "pattern":null,
          "images":[
             "https://example.com/sweater_blue_large.jpg"
          ],
          "price":49.99,
          "stock":10
       },
       {
          "description":"Warm and cozy knit sweater for chilly days",
          "size":"extra-large",
          "color":"gray",
          "pattern":null,
          "images":[
             "https://example.com/sweater_gray_xlarge.jpg"
          ],
          "price":49.99,
          "stock":15
       }
    ]
 }]

 //get all sizes available small, medium, extra-large
 //get all the colors green, blue, gray
//print all of the available options as selectable
//select the first variant at start: its size and color.
//if you select a size
//gray out all colors not in that size and if it was selected, deselect it
//if you select a color
//gray out all sizes not in that color and if it was selected, deselect it
const ProductComponent = ({ product }) => {
    const image = <div className="product-image" style={{ backgroundImage: `url(${product.default_image})` }} />

    const content = (
        <div>
            {
                <div className="product-component-container">
                    <div className="product-image-container">
                        {image}
                    </div>
                    <div className="product-header">{product.name}</div>
                    <div className="product-info">{product.description}</div>
                </div>
            }
        </div>
    )
    return (
        <Card element={product} content={content} />
    )
}

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


    const { products } = useSelector(state => state.product);
    const { user: currentUser } = useSelector((state) => state.auth);
    const { enrollments } = useSelector((state) => state.enrollment);
    const { product_permissions } = useSelector((state) => state.product_permissions);
    const { sites, current_site: site } = useSelector((state) => state.site);
    const { site_product_availability } = useSelector((state) => state.site_product_availability);
    const { fetched: fetchedProducts } = useSelector((state) => state.product);

    const dispatch = useDispatch();

    let PageSize = 30;

    const heroPageInfo = {
        page: 'products',
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
        console.log(site);
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
                                                return <ProductComponent product={product} />
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
        </div>

    );
}

export default ProductList;
