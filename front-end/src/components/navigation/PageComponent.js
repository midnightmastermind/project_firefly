import React from 'react';
import TextElement from './components/TextElement';
import ImageElement from './components/ImageElement';
import VideoElement from './components/VideoElement';
import ListElement from './components/ListElement';

const PageComponent = () => {
  const layout = [
    { i: 'text-0', x: 0, y: 0, w: 2, h: 1 },
    { i: 'image-1', x: 2, y: 0, w: 2, h: 2 },
    // Add more items as needed
  ];

  const createElement = (el) => {
    // Set canEdit prop to false for all elements
    const elementProps = { ...el, canEdit: false };

    switch (el.type) {
      case 'text':
        return <TextElement key={el.i} {...elementProps} />;
      case 'image':
        return <ImageElement key={el.i} {...elementProps} />;
      case 'video':
        return <VideoElement key={el.i} {...elementProps} />;
      case 'container':
        return <ListElement key={el.i} {...elementProps} />;
      // Handle other component types
      default:
        return null;
    }
  };

  return (
    <div className="grid">
      <header>Your Header</header>
      {layout.map((el) => createElement(el))}
      <footer>Your Footer</footer>
    </div>
  );
};

export default PageComponent;
