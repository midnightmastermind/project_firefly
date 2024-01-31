/**
 * This code is a functional component that renders a product detail page.
 * The product detail page includes the product title, description, and image.
 * If the user is logged in, they have the option to enroll in the product or edit the product.
 * Admin users have the additional option to delete the product.
 */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update, remove } from "slices/ecommerce/product";
import { create } from "slices/scheduling/enrollment";
import { useParams } from "react-router-dom";
import { findProduct, isEnrolled } from "common/Product";
import PageAuth from "common/PageAuth";
import ToolBar from "components/tools/ToolBar";
import SaveObjectForm from "components/common/SaveObjectForm";


const Product = (props) => {
    const initialProductState = {
        id: null,
        title: "",
        description: "",
        product_image: "",
        published: false
    };
    const [showAdminTools, setShowAdminTools] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(initialProductState);
    const [toolList, setToolList] = useState(null);
    const [message, setMessage] = useState("");
    const { product_id } = useParams();
    const { currentUser } = useSelector((state) => state.auth);
    const products  = useSelector((state) => state.product.products);
    const enrollments = useSelector((state) => state.enrollments.enrollments);
    const dispatch = useDispatch();


    useEffect(() => {
        setCurrentProduct(findProduct(products, product_id));
        if (currentUser) {
            setShowAdminTools(PageAuth.adminAuth(currentUser) || PageAuth.globalAdminAuth(currentUser));
        }
    }, [product_id, products]);


    const updateProduct = (productData) => {
        dispatch(update({ id: currentProduct.id, data: productData }))
            .unwrap()
            .then(response => {
                setMessage("The product was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeProduct = () => {
        dispatch(remove(currentProduct.id))
            .unwrap()
            .then(() => {
                props.history.push("/products");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const enrollProduct = () => {
        dispatch(create({ product_id: currentProduct.id, user_id: currentUser.id }))
            .unwrap()
            .then(() => {
                //props.history.push("/products");
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        const toolList = [
            {
                type: "button",
                text: "Edit Product",
                class: "add-new-button",
                callBackOrLink: setShowEditForm
            },
            {
                type: "button",
                class: "remove-button",
                text: "Delete Product",
                callBackOrLink: removeProduct
            }
        ];

        setToolList(toolList);
    }, []);

    return (
        <div className="component-container">
            <div className="edit-form">
                <h4>Product</h4>
                {(showAdminTools) &&
                    <ToolBar toolList={toolList}/>
                }   
                {!showEditForm &&
                    <div>
                        <div>{currentProduct.Name}</div>
                        <div>{currentProduct.description}</div>
                        <img src={`${currentProduct.Images}`} />
                    </div>
                }

                {showEditForm &&
                    <SaveObjectForm schema={currentProduct} header="" callBackFunction={updateProduct} />
                }
                {currentUser && isEnrolled(products, enrollments, currentUser._id, currentProduct._id) &&
                    <div>
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => enrollProduct(true)}
                        >
                            Enroll
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Product;
