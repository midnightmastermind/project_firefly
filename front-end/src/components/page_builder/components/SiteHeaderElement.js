// HeaderElement.js
import React from 'react';
import { Button, Popover } from '@blueprintjs/core';
import { useState } from 'react';
import Header from 'components/navigation/Header';
// const HeaderElement = ({ element, onRemoveItem, onSaveConfiguration }) => {
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
//         alt={`Header ${element.i}`}
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

// export default HeaderElement;


const HeaderElement = ({ setDraggable, element, onAddItemType, onRemoveItem }) => {
    return (
        <div>
            {/* <ComponentPopup content={(
                <div>
                    <div className="header" style={{ width: "100%", height: "100%" }}>
                        <Header />
                    </div>
                    <span
                        className="remove"
                        style={{ position: "absolute", right: "2px", top: 0, cursor: "pointer", zIndex: '100', color: 'white' }}
                        onClick={() => onRemoveItem(element.i)}
                    >
                        x
                    </span>
                </div>)} element={element} /> */}
        </div>
    );
}

export default HeaderElement