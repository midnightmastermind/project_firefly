// ImageElement.js
import React from 'react';
import { Button, Popover } from '@blueprintjs/core';
import { useState } from 'react';
import example from 'example.jpg';

// const ImageElement = ({ element, onRemoveItem, onSaveConfiguration }) => {
//   const handleCogButtonClick = (e) => {
//     e.stopPropagation();
//     // Handle cog button click
//     // For now, I'm just logging the element's configuration to the console
//     console.log(element);
//   };

//   return (
//     <div
//       key={element.i}
//       data-grid={element}
//       style={{ position: 'relative' }}
//     >
//       <img
//         src={element.src || 'https://via.placeholder.com/150'}
//         alt={`Image ${element.i}`}
//         style={{ maxWidth: '100%', height: 'auto' }}
//       />
//       <div
//         id={`cogs-icon-${element.i}`}
//         style={{
//           visibility: 'hidden',
//           position: 'absolute',
//           top: '5px',
//           left: '5px',
//         }}
//       >
//         <Popover
//           interactionKind="click"
//           content={
//             <div style={{ padding: '10px' }}>
//               <pre>{JSON.stringify(element, null, 2)}</pre>
//             </div>
//           }
//         >
//           <Button icon="cog" minimal={true} onClick={handleCogButtonClick} />
//         </Popover>
//       </div>
//       <Button
//         icon="cross"
//         minimal={true}
//         style={{
//           position: 'absolute',
//           right: '2px',
//           top: 0,
//           cursor: 'pointer',
//         }}
//         onClick={() => onRemoveItem(element.i)}
//       />
//       <Button
//         icon="floppy-disk"
//         minimal={true}
//         style={{
//           position: 'absolute',
//           right: '30px',
//           top: 0,
//           cursor: 'pointer',
//         }}
//         onClick={() => onSaveConfiguration(element)}
//       />
//     </div>
//   );
// };

// export default ImageElement;


// const ImageElement = ({ setDraggable, element, onAddItemType, onRemoveItem, setLockGrid }) => {
//   return (
//     <div>
//       <ComponentPopup type="image" content={(
//         <div>
//           <img
//             src={element.src || example} // Sample image source
//             alt={`Image ${element.i}`}
//             style={{ maxWidth: "100%", height: "auto" }}
//           />
//         </div>
//       )} element={element}        
//       setLockGrid={setLockGrid}
//       />
//     </div>
//   );
// }

const ImageElement = ({ setDraggable, element, onAddItemType, onRemoveItem, setLockGrid }) => {
  return (
    <div>
        <div className="image-element"
            draggable="false"
            style={{backgroundImage: `${element.src || example}`}}
            alt={`Image ${element.i}`}
          />
    </div>
  );
}

export default ImageElement