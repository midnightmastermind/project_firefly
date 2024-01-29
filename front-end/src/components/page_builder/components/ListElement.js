// ListElement.js
import React from 'react';
import { Button, Popover } from '@blueprintjs/core';
import ComponentPopup from '../ComponentSettings';
import { useState } from 'react';
// const ListElement = ({ element, onAddItemType, onRemoveItem, onSaveConfiguration }) => {
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
//       <div>
//         {element.add ? (
//           <span
//             className="add text"
//             onClick={() => onAddItemType('text')}
//             title="You can add an item by clicking here, too."
//           >
//             Add +
//           </span>
//         ) : (
//           <span className="text">{element.i}</span>
//         )}
//         <span
//           className="remove"
//           style={{
//             position: 'absolute',
//             right: '2px',
//             top: 0,
//             cursor: 'pointer',
//           }}
//           onClick={() => onRemoveItem(element.i)}
//         >
//           x
//         </span>
//       </div>
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

// export default ListElement;

const ListElement = ({ setDraggable, element, onAddItemType, onRemoveItem, setLockGrid }) => {

    return (
        <div>
            <ComponentPopup content={(
                <div>
                    <span className="text">{element.i}</span>
                    <span
                        className="remove"
                        style={{ position: "absolute", right: "2px", top: 0, cursor: "pointer" }}
                        onClick={() => onRemoveItem(element.i)}
                    >
                        x
                    </span>
                </div>
            )} element={element} 
            setLockGrid={setLockGrid}
            />
        </div>
    );
}

export default ListElement;