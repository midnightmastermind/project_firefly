// Product.js
import React, { useState } from 'react';
import { Card, Elevation, Button, Collapse, CardList, Tag } from '@blueprintjs/core';

const Variation = ({ data }) => {
  // Variation component rendering
  return (
    <div key={data.id}>
      <h4>{data.name}</h4>
      <p>{data.description}</p>
      {/* Additional content for each variation */}
      {data.content && <p>{data.content}</p>}
    </div>
  );
};

const Product = ({ data, displayParams }) => {
  const [isVariationsOpen, setVariationsOpen] = useState(false);

  return (
    <Card key={data.id} elevation={Elevation.THREE} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      {/* Product details */}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <img
          src={data.image}
          alt={data.name}
          style={{ width: '200px', height: '150px', objectFit: 'cover' }}
        />

        <div style={{ width: '375px', textAlign: 'center', marginTop: '10px', marginLeft: '20px' }}>
          {displayParams.map(param => (
            <div key={param.type} style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
              <Tag
                key={param.key}
                minimal={true}
              >
                {param.key}
              </Tag>
              <div style={{ marginTop: '5px' }}>
                {data[param.key]}
              </div>
            </div>
          ))}
        </div>
        {/* Variations section with Collapse and Button */}
        <div style={{ alignSelf: 'end', marginLeft: 'auto' }}>
          <Tag interactive={true} onClick={() => setVariationsOpen(!isVariationsOpen)} minimal>
            Variations
          </Tag>
        </div>
      </div>
      {isVariationsOpen && (
        <Button icon="add" intent="primary">
          Add Variation
        </Button>
      )}
      <Collapse isOpen={isVariationsOpen}>
        {data.variations && data.variations.length > 0 && (
          <CardList>
            {data.variations.map(variation => (
              <Variation key={variation.id} data={variation} />
            ))}
          </CardList>
        )}
      </Collapse>
    </Card>
  );
};

export default Product;
