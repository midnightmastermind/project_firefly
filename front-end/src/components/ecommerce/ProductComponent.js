import React, { useState, useEffect } from 'react';
import { Card, Button, Classes, H4, Intent, HTMLSelect, FormGroup, Tag, Divider } from '@blueprintjs/core';
import { create as createCartItem, getAll as getAllCartItems, update as updateCartItem } from 'slices/ecommerce/cart_item';
import { useDispatch, useSelector } from "react-redux";
import parse from 'html-react-parser';
import Carousel from 'components/elements/Carousel';
const ProductComponent = ({ product }) => {

    const { user: currentUser } = useSelector((state) => state.auth);
    const { cart_items } = useSelector((state) => state.cart_item);
    const dispatch = useDispatch();

    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [attributeFields, setAttributeFields] = useState([]);
    const [filteredVariations, setFilteredVariations] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const images = product.images.map(image => {
            return {
                type: 'image',
                src: image
            }
        });
        // Initialize attributeFields array dynamically based on product attributes
        const attributeFields = Object.keys(product)
            .filter((key) => key.startsWith('attribute_') && key.endsWith('_name'))
            .map((attributeNameKey) => {
                const attributeIndex = attributeNameKey.split('_')[1];
                const attributeName = product[attributeNameKey];
                const attributeValuesKey = `attribute_${attributeIndex}_values`;
                return {
                    name: attributeName,
                    index: attributeValuesKey,
                    values: product[attributeValuesKey] || [],
                };
            });

        setAttributeFields(attributeFields);
        setImages(images);
    }, [product]);

    useEffect(() => {
        if (Object.keys(selectedAttributes).length === 0) {
            setFilteredVariations(product.variations); // Use all variations if no attributes selected
            return;
        }

        console.log(attributeFields);
        console.log(selectedAttributes);

        // Update filteredVariations when attributes change
        const matchingVariations = product.variations.filter((variation) => {
            let match = true;
            Object.keys(selectedAttributes).forEach(key => {
                if (selectedAttributes[key] != variation[key]) {
                    match = false;
                }
            });

            return match;
        });

        setFilteredVariations(matchingVariations);
    }, [selectedAttributes, product.variations, attributeFields]);

    const handleAttributeChange = (attributeIndex, selectedValue) => {
        setSelectedAttributes((prevAttributes) => ({
            ...prevAttributes,
            [attributeIndex]: selectedValue,
        }));
    };

    const handleAddToCart = () => {
        // Add to cart logic goes here
        console.log(`${product.name} added to cart`);

        const new_cart_item = {
            user_id: currentUser.id,
            product_id: product._id,
            quantity: 1,
            type: 'cart',
        };

        if (cart_items) {
            const existing_cart_item = cart_items.find(item => item.product_id === product._id);
            if (existing_cart_item) {
                const updated_cart_item = { ...existing_cart_item, attributes: selectedAttributes };
                updated_cart_item.quantity = existing_cart_item.quantity + 1;
                dispatch(updateCartItem({ id: existing_cart_item._id, data: updated_cart_item }))
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
            type: 'saved',
        };

        dispatch(createCartItem(new_cart_item))
            .unwrap()
            .then(data => {
                dispatch(getAllCartItems());
            })
            .catch(e => {
                console.log(e);
            });
    };

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const price = product.sale_price ? (
        <span className="sale-tag">
            <span style={{ color: 'red', textDecoration: 'line-through' }}>
                {`${formatter.format(product.regular_price)}`}
            </span>
            {`${formatter.format(product.sale_price)}`}
        </span>
    ) : (
        <span>{`${formatter.format(product.regular_price)}`}</span>
    );

    return (
        <Card className={`product-component ${Classes.ELEVATION_2}`}>
            {/* <div>
                <strong>{product.categories}</strong>
            </div> */}
            {/* <img src={product.images[0]} alt={product.name} className="product-overlay-image" /> */}
            <Carousel items={images} />
            <div className="product-details">
                <div className="product-name"><H4>{product.name}</H4></div>
                {product.description && <div className="desciption">{parse(product.description)}</div>}

                <div className="product-info">
                    <Divider />
                    <div className="product-attributes">
                        {attributeFields.map((attribute) => (
                            <FormGroup key={attribute.name} label={attribute.name}>
                                <HTMLSelect
                                    value={selectedAttributes[attribute.index] || ''}
                                    onChange={(e) => handleAttributeChange(attribute.index, e.target.value)}
                                >
                                    <option value="" disabled>Select {attribute.name}</option>
                                    {attribute.values.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </HTMLSelect>
                            </FormGroup>
                        ))}
                    </div>
                    <Divider />
                    <div className="product-price"><Tag>{price}</Tag></div>
                </div>

                <div className="product-actions">
                    <Button intent={Intent.PRIMARY} onClick={handleAddToList}>
                        Add to List
                    </Button>
                    <Button intent={Intent.SUCCESS} onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                </div>
                {/* <div className="filtered-variations">
                    {filteredVariations.map((variation) => (
                        <div key={variation._id}>
                            <strong>Variation:</strong> {variation.name}, <strong>Price:</strong> {formatter.format(variation.price)}
                        </div>
                    ))}
                </div> */}
            </div>
        </Card>
    );
};

export default ProductComponent;
