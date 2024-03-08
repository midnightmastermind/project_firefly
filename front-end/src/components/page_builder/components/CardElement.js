

// CardElement.js
import React, { memo } from 'react';
import { Button, Popover } from '@blueprintjs/core';
import UserList from 'components/user/UserList';
import Carousel from 'components/elements/Carousel';
import { useState, useEffect } from 'react';

// const CardElement = ({ element, onAddItemType, onRemoveItem, onSaveConfiguration }) => {
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

// export default CardElement;

// const CardElement = ({ setDraggable, element, onAddItemType, onRemoveItem, setLockGrid }) => {

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

const CardElement = memo(({ data, setDraggable, element, onAddItemType, onRemoveItem, setLockGrid }) => {
    const [currentItem, setCurrentItem] = useState({});

    useEffect(() => {
        if (element) {
            setCurrentItem(element);
        }
        
    }, [element]);
  
    const GridViewCard = ({ item }) => {
        // const userCardData = { image: user.profile_image, header: `${user.first_name} ${user.last_name}`, info: user.description, link: { src: `/user/${user._id}`, text: "View User" } }
        const imagesArray = [{
            type: 'image',
            src: item.profile_image
        }];
        const image = (
            <div className="user-grid-view-card-image"><Carousel settings={{ showThumbs: false }} items={imagesArray} /></div>//style={{ backgroundImage: `url(${getFieldByName('images')[0]})` }} />
        );
        return (
            <div
                className="user-grid-view-card-content"
                >
                <div className="user-grid-view-card-image-container">{image}</div>
                <div className="user-grid-view-card-header-container">
                    <div className="user-grid-view-card-header">{`${item.first_name} ${item.last_name}`}</div>
                </div>
                <div className="user-grid-view-card-info-container">
                    <div className="user-grid-view-card-info">{`${item.description}`}</div>
                </div>
            </div>
        )
    }
    return (
        <div className="card-element-container">
            <div
                className="card-element">
                {data && <GridViewCard item={data}/> }
            </div>
        </div>
    );
});

export default CardElement;