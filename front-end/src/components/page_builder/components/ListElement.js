// ListElement.js
import React, { memo } from 'react';
import { Button, Popover } from '@blueprintjs/core';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserList from 'components/user/UserList';
// import WebPagePreview from "components/common/NewWebpagePreview";
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

// const ListElement = ({ setDraggable, element, onAddItemType, onRemoveItem, setLockGrid }) => {

//     return (
//         <div>
//             <ComponentPopup content={(
//                 <div>
//                     <span className="text">{element.i}</span>
//                     <span
//                         className="remove"
//                         style={{ position: "absolute", right: "2px", top: 0, cursor: "pointer" }}
//                         onClick={() => onRemoveItem(element.i)}
//                     >
//                         x
//                     </span>
//                 </div>
//             )} element={element} 
//             setLockGrid={setLockGrid}
//             />
//         </div>
//     );
// }

const scalingArray = [.11, .11, .24, .36, .48, .48, .48, .48, .48, .48, .48, .48, .48];

const ListElement = memo(({ setDraggable, element, onAddItemType, onRemoveItem, setLockGrid }) => {

    const { current_site: site } = useSelector((state) => state.site);
    const [currentSite, setCurrentSite] = useState(null);
    const [currentItem, setCurrentItem] = useState({});

    useEffect(() => {
        if (element) {
            setCurrentItem(element);
        }
        
    }, [element]);

    console.log(element);

    useEffect(() => {
        if (site) {
            setCurrentSite(site)
        }
    }, [site]);


    return (
        <div className="list-element-container">
            <div className="list-element">
               {/* {currentSite && <WebPagePreview url={`${currentSite.domain == 'main' ? '' : currentSite.domain}/users`} />} */}
               <UserList scalingFactor={currentItem['scalingFactor'] || 1} hideHeader={true}/>
            </div>
        </div>
    );
});

export default ListElement;