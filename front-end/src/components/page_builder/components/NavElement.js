// HeaderElement.js
import React, { memo } from 'react';
import { Button, Popover } from '@blueprintjs/core';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
// const HeaderElement = ({ element, onAddItemType, onRemoveItem, onSaveConfiguration }) => {
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

// export default HeaderElement;

// const defaultElementStyle = {
//   color: 'red',
//   fontFamily: 'Arial, sans-serif',
//   fontSize: 16,
//   margin: '10',
//   marginRight: '10',
//   marginTop: '10',
//   marginBottom: '10',
//   marginLeft: '10',
//   padding: '20',
//   paddingRight: '20',
//   paddingTop: '20',
//   paddingBottom: '20',
//   paddingLeft: '20',
//   borderSize: '2',
//   borderSizeRight: '2',
//   borderSizeTop: '2',
//   borderSizeBottom: '2',
//   borderSizeLeft: '2',
//   borderColor: 'red',
//   borderColorRight: 'red',
//   borderColorTop: 'red',
//   borderColorBottom: 'red',
//   borderColorLeft: 'red',
//   borderType: 'solid',
//   borderTypeTop: 'solid',
//   borderTypeBottom: 'solid',
//   borderTypeRight: 'solid',
//   borderTypeLeft: 'solid',
//   borderRadius: '5',
//   width: 200,
//   height: 100,
//   opacity: 1,
//   backgroundColor: 'red',
// };

// const HeaderElement = ({ setDraggable, element, onAddItemType, onRemoveItem, setLockGrid, editComponent }) => {
//   const [style, setStyle] = useState(element.style || defaultElementStyle);

//   useEffect(() => {
//     setStyle(element.style);
//   }, [element])
//   console.log(element);
//   return (
//     <div>
//       <ComponentSettings
//         type="text"
//         setLockGrid={setLockGrid}
//         setDraggable={setDraggable}
//         editComponent={editComponent}
//         content={(
//           <div>
//             <span style={style} className="text">{element.i}</span>
//           </div>
//         )} element={element} />
//     </div>
//   );
// }

const NavElement = memo(({ setDraggable, element, style, onAddItemType, onRemoveItem, setLockGrid, editComponent }) => {
  const [styleState, setStyleState] = useState(style);

  useEffect(() => {
    setStyleState(style);
  }, [style])

  return (
    <div style={{ ...styleState }} className="header-element">
      {element.content || "Header"}
    </div>
  );
});
export default NavElement;