
// VideoElement.js
import React, { memo } from 'react';
import { Button, Popover } from '@blueprintjs/core';
import { useState, useEffect } from 'react';

// const VideoElement = ({ element, onRemoveItem, onSaveConfiguration }) => {
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
//       <iframe
//         style={{ overflow: 'hidden', pointerEvents: 'none' }}
//         width="100%"
//         height="100%"
//         src={element.src || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
//         title={`Video ${element.i}`}
//         frameBorder="0"
//         allowFullScreen
//       ></iframe>
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

// export default VideoElement;


// const VideoElement = ({ element, onAddItemType, onRemoveItem, setLockGrid, editComponent }) => {
//   return (
//     <div style={{height: "100%"}} className="my-context-menu-target">
//       <ComponentSettings editComponent={editComponent} type="video" style={{height: "100%"}} content={(
//         <div style={{height: "100%"}}>
//           <iframe
//             style={{ overflow: 'hidden', pointerEvents: 'none' }}
//             width="100%"
//             height="100%"
//             src={element.source || "https://www.youtube.com/embed/dQw4w9WgXcQ"} // Sample video source
//             title={`Video ${element.i}`}
//             frameBorder="0"
//             allowFullScreen
//           ></iframe>
//         </div>
//       )} element={element} setLockGrid={setLockGrid}/>
//     </div>
//   );
// }

const VideoElement = memo(({ element, onAddItemType, onRemoveItem, setLockGrid, editComponent, isNew }) => {


  return (
    <div style={{ height: "100%" }} className="my-context-menu-target">
      <div style={{ height: "100%" }}>
        <iframe
          style={{ overflow: 'hidden' }}
          width="100%"
          height="100%"
          src={element.source || "https://www.youtube.com/embed/dQw4w9WgXcQ"} // Sample video source
          title={`Video ${element.i}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
});


export default VideoElement;