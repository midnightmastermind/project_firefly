import React from 'react';
import { Card, Button, Classes, H4, H5, Intent } from '@blueprintjs/core';
import { create as createCartItem, getAll as getAllCartItems, update as updateCartItem  } from 'slices/ecommerce/cart_item';
import { useDispatch, useSelector } from "react-redux";

const ProductComponent = ({ product }) => {
    const { title, description, price, availability, product_image } = product;
    const { user: currentUser } = useSelector((state) => state.auth);
    const { cart_items } = useSelector((state) => state.cart_item);
    const dispatch = useDispatch();
    console.log(currentUser);
    const handleAddToCart = () => {
        // Add to cart logic goes here
        console.log(`${title} added to cart`);

        const new_cart_item = {
            user_id: currentUser.id,
            product_id: product._id,
            quantity: 1,
            type: 'cart'
        }

        if (cart_items) {
            const existing_cart_item = cart_items.find(item => item.product_id == product._id);
            if (existing_cart_item) {
                const updated_cart_item = {...existing_cart_item};
                updated_cart_item.quantity = existing_cart_item.quantity + 1;
                dispatch(updateCartItem({id: existing_cart_item._id, data: updated_cart_item}))
                    .unwrap()
                    .then(data => {
                        dispatch(getAllCartItems());
                    })
                    .catch(e => {
                        console.log(e);
                    });
                    return;
            }
        }
        dispatch(createCartItem(new_cart_item))
            .unwrap()
            .then(data => {
                dispatch(getAllCartItems());
            })
            .catch(e => {
                console.log(e);
            });

    };

    const handleAddToList = () => {
        const new_cart_item = {
            user_id: currentUser.id,
            product_id: product._id,
            quantity: 1,
            type: 'saved'
        }
        dispatch(createCartItem(new_cart_item))
            .unwrap()
            .then(data => {
                dispatch(getAllCartItems());
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <Card className={Classes.ELEVATION_2}>
            <img src={product_image} alt={title} className="product-overlay-image" />
            <div className="product-details">
                <H4>{title}</H4>
                <p>{description}</p>
                <H5>Price: ${price}</H5>
                <p>{availability ? 'In Stock' : 'Out of Stock'}</p>
                <div className="product-actions">
                    <Button
                        intent={Intent.PRIMARY}
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>
                    <Button
                        intent={Intent.SECONDARY}
                        onClick={handleAddToList}
                    >
                        Add to List
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ProductComponent;
