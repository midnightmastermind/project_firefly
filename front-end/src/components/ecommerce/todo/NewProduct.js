import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductComponent = ({ product }) => {
    const [selectedImage, setSelectedImage] = useState(selectedVariant.find((o.name == 'images')[0]));
    const image = <div className="product-image" style={{ backgroundImage: `url(${variant.attributes.find(o => o.name === 'image').value[selectedImage]})` }} />

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
  
    const availableOptions = exampleData[0].variants.reduce((acc, variant) => {
      if (!acc.colors.includes(variant.color)) {
        acc.colors.push(variant.color);
      }
      if (!acc.sizes.includes(variant.size)) {
        acc.sizes.push(variant.size);
      }
      return acc;
    }, { colors: [], sizes: [] });
  
    const sizeOptions = selectedColor
      ? product.variants
          .filter((variant) => variant.color === selectedColor)
          .map((variant) => variant.size)
      : availableOptions.sizes;
  
    const colorOptions = selectedSize
      ? product.variants
          .filter((variant) => variant.size === selectedSize)
          .map((variant) => variant.color)
      : availableOptions.colors;
  
    const content = (
        <div>
            {
                product.variants && product.attributes.map((variant, index) => {
                    if (selectedVariant == variant.id) {
                        return (
                            <div className="product-component-container">
                                <div className="product-image-container">
                                    {image}
                                    <div className="product-image-select-container">
                                        {
                                            variant.images.map((image, index) => {
                                                <div className="product-image-preview" style={{ backgroundImage: image.value }} onClick={() => setSelectedImage(index)}></div>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="product-header">{product.name}</div>
                                <div className="product-info">{variant.description}</div>
                                <div className="product-variant-selection">
                                <label>Color:</label>
                                    <Dropdown
                                        items={colorOptions}
                                        onChange={(color) => setSelectedColor(color)}
                                        text={selectedColor || 'Select Color'}
                                    >
                                        {colorOptions.map((color) => (
                                        <MenuItem key={color} text={color} />
                                        ))}
                                    </Dropdown>

                                    <label>Size:</label>
                                    <Dropdown
                                        items={sizeOptions}
                                        onChange={(size) => setSelectedSize(size)}
                                        text={selectedSize || 'Select Size'}
                                    >
                                        {sizeOptions.map((size) => (
                                        <MenuItem key={size} text={size} />
                                        ))}
                                    </Dropdown>
                                </div>
                                <div className="product-action-buttons">
                                    <Button className="product-link-button">
                                        <Link
                                            className="link"
                                            to={`/product/${product._id}?variant=${variant.id}`}
                                        >
                                            View
                                        </Link>
                                    </Button>
                                    <Button className="product-purchase-button">
                                        <Icon icon="cart" />
                                        Add to Cart
                                    </Button>
                                    <Button className="product-save-button">
                                        <Icon icon="add" />
                                        Save
                                    </Button>
                                </div>
                            </div>
                        );
                    }
                })
            }
        </div>
    )
    return (
        <Card key={index} content={content} />
    )
}

export default ProductComponent;