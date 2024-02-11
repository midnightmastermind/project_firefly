import React, { useState } from 'react';
import { CardList, Button, Classes } from '@blueprintjs/core';
import CategoryForm from './CategoryForm';
import { PanelStack2 } from '@blueprintjs/core';

const Category = ({ data, onCategoryClick }) => {
  const handleClick = () => {
    onCategoryClick(data);
  };

  return (
    <div onClick={handleClick} style={{ marginBottom: '10px', cursor: 'pointer' }}>
      <h3>{data.name}</h3>
      <p>ID: {data.id}</p>
      <p>Description: {data.description}</p>
      <p>Price: {data.price}</p>
      <p>Image: {data.image}</p>
    </div>
  );
};

const CategoryListWithPanelStack = ({ categoryList, displayParams }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const CategoryPanelStack = () => {
    const [currentPanelStack, setCurrentPanelStack] = useState([
      {
        component: () => (
          <CategoryForm categoryData={selectedCategory || {}} />
        ),
        title: selectedCategory ? 'Edit Category' : 'Add New Category',
      },
    ]);

    const addToPanelStack = (panel) => {
      setCurrentPanelStack((prevStack) => [...prevStack, panel]);
    };

    const removeFromPanelStack = () => {
      setCurrentPanelStack((prevStack) => prevStack.slice(0, -1));
    };

    return (
      <div>
        <PanelStack2
          className="docs-panel-stack-example"
          onOpen={addToPanelStack}
          onClose={removeFromPanelStack}
          renderActivePanelOnly={true}
          stack={currentPanelStack}
        />
        <div className={Classes.DIALOG_FOOTER}>
          <Button onClick={removeFromPanelStack}>Back to List</Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Button intent="primary" onClick={() => handleCategoryClick({})}>
        Add New Category
      </Button>
      <CardList className="new-category-list">
        {categoryList.map((category) => (
          <Category key={category.id} data={category} onCategoryClick={handleCategoryClick} />
        ))}
      </CardList>
      {selectedCategory && <CategoryPanelStack />}
    </div>
  );
};

export default CategoryListWithPanelStack;
