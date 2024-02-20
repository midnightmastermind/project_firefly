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
    const [productImages, setProductImages] = useState([]);

    // Function to get field value by name
    const getFieldByName = (fieldName, valueType) => {
        const field = product.fields.find((field) => field.name === fieldName);
        return field ? field[valueType] : null;
    };

    // Function to handle attribute selection
    const handleAttributeChange = (attributeIndex, selectedValue) => {
        setSelectedAttributes((prevAttributes) => ({
            ...prevAttributes,
            [attributeIndex]: selectedValue,
        }));
    };

    useEffect(() => {
        // Use getFieldByName to get the 'images' value from product fields
        const images = getFieldByName('images', 'value');
        const imagesArray = images.map(image => {
            return {
                type: 'image',
                src: image
            }
        });

        // Initialize attributeFields array dynamically based on product attributes
        const attributeFields = product.fields
            .filter((field) => field.variation)
            .map((attributeField) => {
                console.log(attributeField);
                return {
                    name: attributeField.name,
                    index: attributeField.name,
                    values: attributeField.selection,
                };
            });

        setAttributeFields(attributeFields);
        setProductImages(imagesArray);
    }, [product]);

    useEffect(() => {
        let images;
        if (Object.keys(selectedAttributes).length === 0) {
            setFilteredVariations(product.data); // Use all variations if no attributes selected
            images = getFieldByName('images', 'value');
        } else {
            // Update filteredVariations when attributes change
            console.log(selectedAttributes);
            const matchingVariations = product.data.filter((variation) => {
                let match = true;
                Object.keys(selectedAttributes).forEach(key => {
                        if (selectedAttributes[key] !== variation[key]) {
                            match = false;
                        }
                    });

                    return match;
                });
            console.log(matchingVariations);
            setFilteredVariations(matchingVariations);
            images = matchingVariations[0].images;
        }
        
        const imagesArray = images.map(image => {
            return {
                type: 'image',
                src: image
            }
        });
        setProductImages(imagesArray);
    }, [selectedAttributes, product.data]);

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
            const existing_cart_item = cart_items.find(item => item.product_id === product.id);
            if (existing_cart_item) {
                const updated_cart_item = { ...existing_cart_item, attributes: selectedAttributes };
                updated_cart_item.quantity = existing_cart_item.quantity + 1;
                dispatch(updateCartItem({ id: existing_cart_item.id, data: updated_cart_item }))
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

    // Get values using getFieldByName
    const productName = getFieldByName('name', 'value');
    const productDescription = getFieldByName('description', 'value');
    const salePrice = getFieldByName('sale_price', 'value');
    const regularPrice = getFieldByName('regular_price', 'value');
    const price = salePrice ? (
      <span className="sale-tag">
        <span style={{ color: 'red', textDecoration: 'line-through' }}>{`${formatter.format(regularPrice)}`}</span>
        {`${formatter.format(salePrice)}`}
      </span>
    ) : (
      <span>{`${formatter.format(regularPrice)}`}</span>
    );
  
    return (
        <div className={`product-component ${Classes.ELEVATION_2}`}>
            <Carousel items={productImages} />
            <div className="product-details">
                <div className="product-name"><H4>{productName}</H4></div>
                {productDescription && <div className="product-description">{parse(productDescription)}</div>}
                <div className="product-info">
                    <Divider />
                    <div className="product-attributes">
                        {attributeFields.map((attribute) => (
                            <FormGroup key={attribute.index} label={attribute.name}>
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
            </div>
        </div>
    );
};

export default ProductComponent;

