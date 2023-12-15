// Product.js
import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import CardList from '../elements/CardList';


const Variation = ({ data }) => {
  // Variation component rendering
  return (
    <div>
      <h4>{data.name}</h4>
      <p>{data.description}</p>
      {/* Additional content for each variation */}
      {data.content && <p>{data.content}</p>}
    </div>
  );
};

const Product = ({ data, displayParams }) => {
  return (
    <Card elevation={Elevation.THREE} style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Product Image */}
        <img src={data.image} alt={data.name} style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'cover' }} />

        {/* Dynamic Data (Profile-like) */}
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          {displayParams.map(param => (
            <div key={param.type} style={{ marginBottom: '10px' }}>
              <strong>{param.type}:</strong> {data[param.key]}
            </div>
          ))}
        </div>
      </div>

      {/* Variations section */}
      <div>
        <h3>Variations</h3>
        <CardList data={data.variations} displayParams={[{ type: 'text', key: 'name' }, { type: 'content', key: 'description' }]} component={Variation} />
      </div>
    </Card>
  );
};

export default Product;
