// const Gallery = ({ files }) => {
//     const [selectedItem, setSelectedItem] = useState(null);
  
//     const handleItemClick = (index) => {
//       setSelectedItem(index);
//     };
  
//     const handleClose = () => {
//       setSelectedItem(null);
//     };
  
//     return (
//       <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//         {files.map((file, index) => (
//           <div key={index} style={{ margin: '10px' }}>
//             {file.type === 'image' ? (
//               <img
//                 src={file.source}
//                 alt={`Image ${index}`}
//                 style={{ width: '200px', height: '150px', cursor: 'pointer' }}
//                 onClick={() => handleItemClick(index)}
//               />
//             ) : (
//               <video width="320" height="240" controls>
//                 <source src={file.source} type="video/mp4" />
//               </video>
//             )}
//             {selectedItem === index && (
//               <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 {file.type === 'image' ? (
//                   <img
//                     src={file.source}
//                     alt={`Image ${index}`}
//                     style={{ maxWidth: '90%', maxHeight: '90%', cursor: 'pointer' }}
//                     onClick={handleClose}
//                   />
//                 ) : (
//                   <video width="640" height="480" controls>
//                     <source src={file.source} type="video/mp4" />
//                   </video>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };
  
//   export default Gallery;

import React, { useState, useEffect } from 'react';

const Gallery = ({ files, selectedItem: propSelectedItem, setSelectedItem: propSetSelectedItem }) => {
  const [selectedItem, setSelectedItem] = propSelectedItem !== undefined ? [propSelectedItem, propSetSelectedItem] : useState(null);

  useEffect(() => {
    if (propSelectedItem !== undefined) {
      setSelectedItem(propSelectedItem);
    }
  }, [propSelectedItem]);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {files.map((file, index) => (
        <div key={index} style={{ margin: '10px' }}>
          {file.type === 'image' ? (
            <img
              src={file.source}
              alt={`Image ${index}`}
              style={{ width: '200px', height: '150px', cursor: 'pointer' }}
              onClick={() => handleItemClick(index)}
            />
          ) : (
            <video width="320" height="240" controls>
              <source src={file.source} type="video/mp4" />
            </video>
          )}
          {selectedItem === index && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {file.type === 'image' ? (
                <img
                  src={file.source}
                  alt={`Image ${index}`}
                  style={{ maxWidth: '90%', maxHeight: '90%', cursor: 'pointer' }}
                  onClick={handleClose}
                />
              ) : (
                <video width="640" height="480" controls>
                  <source src={file.source} type="video/mp4" />
                </video>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Gallery;
