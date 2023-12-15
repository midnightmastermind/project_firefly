import React, { useState } from 'react';
import { Breadcrumbs, Breadcrumb, Button } from '@blueprintjs/core';

const BreadcrumbSelector = ({ treeData }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const renderBreadcrumbs = (category) => {
    if (!category) {
      return null;
    }

    const breadcrumbs = [];

    // Recursive function to build breadcrumbs
    const buildBreadcrumbs = (currentCategory) => {
      breadcrumbs.unshift(
        <Breadcrumb key={currentCategory.id} text={currentCategory.name} onClick={() => handleCategoryClick(currentCategory)} />
      );

      if (currentCategory.children) {
        buildBreadcrumbs(currentCategory.children[0]);
      }
    };

    buildBreadcrumbs(category);

    return breadcrumbs;
  };

  return (
    <div>
      <h2>Breadcrumb Selector</h2>
      <Breadcrumbs className="breadcrumbs">
        {renderBreadcrumbs(selectedCategory)}
      </Breadcrumbs>
      <ul>
        {treeData.map((category) => (
          <li key={category.id} onClick={() => handleCategoryClick(category)}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreadcrumbSelector;
