// import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//     ChonkyActions,
//     ChonkyFileActionData,
//     FileArray,
//     FileBrowserProps,
//     FileData,
//     FileHelper,
//     FullFileBrowser,
//     setChonkyDefaults
// } from 'chonky';
// import { Button } from '@blueprintjs/core';
// import DemoFsMap from './empty_demo.json';
// import { FileUploader } from './FileUploader';
// import { v4 as uuidv4 } from 'uuid';
// import { create as createFile, getAll as getAllFiles, update as updateFile } from 'slices/storage/file';
// import { ChonkyIconFA } from 'chonky-icon-fontawesome';
// import FilePreviewModal from './FilePreviewModal';
// import videoSnapshot from 'video-snapshot'
// const prepareCustomFileMap = () => {
//     const baseFileMap = DemoFsMap.fileMap;
//     const rootFolderId = DemoFsMap.rootFolderId;
//     return { baseFileMap, rootFolderId };
// };
// const FileManager = (props) => {
//     const { baseFileMap, rootFolderId } = useMemo(prepareCustomFileMap, []);
//     const [fileMap, setFileMap] = useState(baseFileMap);
//     const [currentFolderId, setCurrentFolderId] = useState(rootFolderId);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//     const dispatch = useDispatch();

//     const handleFileDoubleClick = useCallback((file) => {
//         console.log("blah blah blha");
//       setSelectedFile(file);
//       setIsPreviewOpen(true);
//     }, []);
  
//     const handleClosePreview = useCallback(() => {
//       setIsPreviewOpen(false);
//     }, []);

//     setChonkyDefaults({ iconComponent: ChonkyIconFA });
//     const resetFileMap = useCallback(() => {
//         setFileMap(baseFileMap);
//         setCurrentFolderId(rootFolderId);
//     }, [baseFileMap, rootFolderId]);

//     const currentFolderIdRef = useRef(currentFolderId);
//     useEffect(() => {
//         currentFolderIdRef.current = currentFolderId;
//     }, [currentFolderId]);

//     const files = useSelector((state) => state.file.files);

//     useEffect(() => {
//         if (files && files.length > 0) {
//             const updatedFiles = transformFilesToFormat(files);
//             setFileMap(updatedFiles.fileMap);
//             setCurrentFolderId(updatedFiles.rootFolderId);
//         }
//     }, [files]);

//     const transformFilesToFormat = (updatedFiles) => {
//         console.log(updatedFiles);
//         const rootFolder = updatedFiles.find((file) => file.isDir && !file.parentId);
//         console.log(rootFolder);
//         const result = {
//             rootFolderId: rootFolder ? rootFolder.id : "",
//             fileMap: {},
//         };
//         console.log(result);
//         updatedFiles.forEach((file) => {
//             result.fileMap[file.id] = { ...file };
//         });
//         console.log(result);
//         return result;
//     };

//     const deleteFiles = useCallback((files) => {
//         setFileMap((currentFileMap) => {
//             const newFileMap = { ...currentFileMap };

//             files.forEach((file) => {
//                 delete newFileMap[file.id];

//                 if (file.parentId) {
//                     const parent = newFileMap[file.parentId];
//                     if (parent) {
//                         const newChildrenIds = parent.childrenIds.filter(
//                             (id) => id !== file.id
//                         );
//                         newFileMap[file.parentId] = {
//                             ...parent,
//                             childrenIds: newChildrenIds,
//                             childrenCount: newChildrenIds.length,
//                         };
//                     }
//                 }
//             });

//             return newFileMap;
//         });
//     }, []);

//     const moveFiles = useCallback(
//         (files, source, destination) => {
//             // setFileMap((currentFileMap) => {
//             //     const newFileMap = { ...currentFileMap };
//             //     const moveFileIds = new Set(files.map((f) => f.id));

//             //     const newSourceChildrenIds = source.childrenIds.filter(
//             //         (id) => !moveFileIds.has(id)
//             //     );
//             //     newFileMap[source.id] = {
//             //         ...source,
//             //         childrenIds: newSourceChildrenIds,
//             //         childrenCount: newSourceChildrenIds.length,
//             //     };

//             //     const newDestinationChildrenIds = [
//             //         ...destination.childrenIds,
//             //         ...files.map((f) => f.id),
//             //     ];
//             //     newFileMap[destination.id] = {
//             //         ...destination,
//             //         childrenIds: newDestinationChildrenIds,
//             //         childrenCount: newDestinationChildrenIds.length,
//             //     };

//             //     files.forEach((file) => {
//             //         newFileMap[file.id] = {
//             //             ...file,
//             //             parentId: destination.id,
//             //         };
//             //     });

//             //     return newFileMap;
//             // });
//             // setFileMap((currentFileMap) => {
//             const updated_files = [];
//             const moveFileIds = new Set(files.map((f) => f.id));

//             const newSourceChildrenIds = source.childrenIds.filter(
//                 (id) => !moveFileIds.has(id)
//             );

//             updated_files.push({
//                 ...source,
//                 childrenIds: newSourceChildrenIds,
//                 childrenCount: newSourceChildrenIds.length,
//             });

//             const newDestinationChildrenIds = [
//                 ...destination.childrenIds,
//                 ...files.map((f) => f.id),
//             ];

//             updated_files.push({
//                 ...destination,
//                 childrenIds: newDestinationChildrenIds,
//                 childrenCount: newDestinationChildrenIds.length
//             });
//             console.log(updated_files);


//             files.forEach((file) => {
//                 updated_files.push({
//                     ...file,
//                     parentId: destination.id,
//                 });
//             });

//             //     return newFileMap;
//             // });
//             updated_files.forEach((file) => {
//                 dispatch(updateFile({ id: file._id, data: file }))
//                     .unwrap()
//                     .then(data => {
//                         dispatch(getAllFiles());
//                     })
//                     .catch(e => {
//                         console.log(e);
//                     });
//             });

//         },
//         [dispatch]
//     );

//     const idCounter = useRef(0);

//     const createFolder = useCallback((folderName) => {
//         const newFolderId = uuidv4();
//         const folderData = {
//             id: newFolderId,
//             name: folderName,
//             isDir: true,
//             modDate: new Date(),
//             parentId: currentFolderIdRef.current,
//             childrenIds: [],
//             childrenCount: 0,
//         };
//     });
    
//       const [videoThumbnails, setVideoThumbnails] = useState({});
    
//       const thumbnailGenerator = useCallback(
//         async (file) => {
//           if (FileHelper.isVideoFile(file)) {
//             if (!videoThumbnails[file.id]) {
//               try {
//                 const snapshot = await videoSnapshot(file.source, {
//                   width: 100,
//                   height: 100,
//                 });
//                 setVideoThumbnails((prevThumbnails) => ({
//                   ...prevThumbnails,
//                   [file.id]: snapshot,
//                 }));
//               } catch (error) {
//                 console.error('Error generating video preview image:', error);
//               }
//             }
//             return videoThumbnails[file.id] || null;
//           } else {
//             return file.source;
//           }
//         },
//         [videoThumbnails]
//       );
    
//       useEffect(() => {
//         // Cleanup videoThumbnails when component unmounts
//         return () => {
//           Object.values(videoThumbnails).forEach((thumbnail) => {
//             // Cleanup resources (if needed) when the component is unmounted
//           });
//         };
//       }, [videoThumbnails]);
    


//   const useFiles = useMemo(() => {
//     if (fileMap && currentFolderId && fileMap[currentFolderId]) {
//       const currentFolder = fileMap[currentFolderId];
//       const childrenIds = currentFolder.childrenIds;
//       const files = childrenIds.map((fileId) => {
//         const file = fileMap[fileId];
//         // Include the thumbnailUrl property in each file object
//         return { ...file, thumbnailUrl: thumbnailGenerator(file) };
//       });
//       return files;
//     } else {
//       return [];
//     }
//   }, [currentFolderId, fileMap, thumbnailGenerator]);

//     const handleFileDrop = (files) => {
//         // uploadFiles(files);
//         console.log(files);
//     };

//     console.log(fileMap);
//     console.log(files);
//     console.log(selectedFile);
//     console.log(currentFolderId);
//     return (
//         <div className="file-manager-container">
//             <div className="file-manager-title">
//                 <h4>File Manager</h4>
//             </div>

//             <div className="file-manager">
//                 <div className="file-manager-window-container">
//                         <FileUploader folder_id={currentFolderId} />
//                         <FullFileBrowser
//                             files={useFiles}
//                             folderChain={useFolderChain}
//                             fileActions={fileActions}
//                             onFileAction={useFileActionHandler}
//                             thumbnailGenerator={thumbnailGenerator}
//                             onDrop={handleFileDrop}
//                             {...props}
//                         />
//                         { selectedFile && <FilePreviewModal isOpen={isPreviewOpen} onClose={handleClosePreview} selectedFile={selectedFile} setSelectedFile={setSelectedFile} files={files.filter(file =>(!file.isDir))} /> }
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FileManager;


import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    ChonkyActions,
    ChonkyFileActionData,
    FileArray,
    FileBrowserProps,
    FileData,
    FileHelper,
    FullFileBrowser,
    setChonkyDefaults
} from 'chonky';
import { Button } from '@blueprintjs/core';
import DemoFsMap from './empty_demo.json';
import { FileUploader } from './FileUploader';
import { v4 as uuidv4 } from 'uuid';
import { create as createFile, getAll as getAllFiles, update as updateFile } from 'slices/storage/file';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import FilePreviewModal from './FilePreviewModal';

const prepareCustomFileMap = () => {
    const baseFileMap = DemoFsMap.fileMap;
    const rootFolderId = DemoFsMap.rootFolderId;
    return { baseFileMap, rootFolderId };
};
const FileManager = (props) => {
    const { baseFileMap, rootFolderId } = useMemo(prepareCustomFileMap, []);
    const [fileMap, setFileMap] = useState(baseFileMap);
    const [currentFolderId, setCurrentFolderId] = useState(rootFolderId);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const dispatch = useDispatch();

    const handleFileDoubleClick = useCallback((file) => {
        console.log("blah blah blha");
      setSelectedFile(file);
      setIsPreviewOpen(true);
    }, []);
  
    const handleClosePreview = useCallback(() => {
      setIsPreviewOpen(false);
    }, []);

    setChonkyDefaults({ iconComponent: ChonkyIconFA });
    const resetFileMap = useCallback(() => {
        setFileMap(baseFileMap);
        setCurrentFolderId(rootFolderId);
    }, [baseFileMap, rootFolderId]);

    const currentFolderIdRef = useRef(currentFolderId);
    useEffect(() => {
        currentFolderIdRef.current = currentFolderId;
    }, [currentFolderId]);

    const files = useSelector((state) => state.file.files);

    useEffect(() => {
        if (files && files.length > 0) {
            const updatedFiles = transformFilesToFormat(files);
            setFileMap(updatedFiles.fileMap);
            setCurrentFolderId(updatedFiles.rootFolderId);
        }
    }, [files]);

    const transformFilesToFormat = (updatedFiles) => {
        console.log(updatedFiles);
        const rootFolder = updatedFiles.find((file) => file.isDir && !file.parentId);
        console.log(rootFolder);
        const result = {
            rootFolderId: rootFolder ? rootFolder.id : "",
            fileMap: {},
        };
        console.log(result);
        updatedFiles.forEach((file) => {
            result.fileMap[file.id] = { ...file };
        });
        console.log(result);
        return result;
    };

    const deleteFiles = useCallback((files) => {
        setFileMap((currentFileMap) => {
            const newFileMap = { ...currentFileMap };

            files.forEach((file) => {
                delete newFileMap[file.id];

                if (file.parentId) {
                    const parent = newFileMap[file.parentId];
                    if (parent) {
                        const newChildrenIds = parent.childrenIds.filter(
                            (id) => id !== file.id
                        );
                        newFileMap[file.parentId] = {
                            ...parent,
                            childrenIds: newChildrenIds,
                            childrenCount: newChildrenIds.length,
                        };
                    }
                }
            });

            return newFileMap;
        });
    }, []);

    const moveFiles = useCallback(
        (files, source, destination) => {
            // setFileMap((currentFileMap) => {
            //     const newFileMap = { ...currentFileMap };
            //     const moveFileIds = new Set(files.map((f) => f.id));

            //     const newSourceChildrenIds = source.childrenIds.filter(
            //         (id) => !moveFileIds.has(id)
            //     );
            //     newFileMap[source.id] = {
            //         ...source,
            //         childrenIds: newSourceChildrenIds,
            //         childrenCount: newSourceChildrenIds.length,
            //     };

            //     const newDestinationChildrenIds = [
            //         ...destination.childrenIds,
            //         ...files.map((f) => f.id),
            //     ];
            //     newFileMap[destination.id] = {
            //         ...destination,
            //         childrenIds: newDestinationChildrenIds,
            //         childrenCount: newDestinationChildrenIds.length,
            //     };

            //     files.forEach((file) => {
            //         newFileMap[file.id] = {
            //             ...file,
            //             parentId: destination.id,
            //         };
            //     });

            //     return newFileMap;
            // });
            // setFileMap((currentFileMap) => {
            const updated_files = [];
            const moveFileIds = new Set(files.map((f) => f.id));

            const newSourceChildrenIds = source.childrenIds.filter(
                (id) => !moveFileIds.has(id)
            );

            updated_files.push({
                ...source,
                childrenIds: newSourceChildrenIds,
                childrenCount: newSourceChildrenIds.length,
            });

            const newDestinationChildrenIds = [
                ...destination.childrenIds,
                ...files.map((f) => f.id),
            ];

            updated_files.push({
                ...destination,
                childrenIds: newDestinationChildrenIds,
                childrenCount: newDestinationChildrenIds.length
            });
            console.log(updated_files);


            files.forEach((file) => {
                updated_files.push({
                    ...file,
                    parentId: destination.id,
                });
            });

            //     return newFileMap;
            // });
            updated_files.forEach((file) => {
                dispatch(updateFile({ id: file._id, data: file }))
                    .unwrap()
                    .then(data => {
                        dispatch(getAllFiles());
                    })
                    .catch(e => {
                        console.log(e);
                    });
            });

        },
        [dispatch]
    );

    const idCounter = useRef(0);

    const createFolder = useCallback((folderName) => {
        const newFolderId = uuidv4();
        const folderData = {
            id: newFolderId,
            name: folderName,
            isDir: true,
            modDate: new Date(),
            parentId: currentFolderIdRef.current,
            childrenIds: [],
            childrenCount: 0,
        };

        // Dispatch the createFile action to create the folder
        dispatch(createFile(folderData))
            .then(() => {
                // After creating the folder, dispatch getAllFiles to update the fileMap
                dispatch(getAllFiles());
            })
            .catch((error) => {
                console.error('Error creating or fetching folder:', error);
            });

        // // Optionally, you can update the local state using setFileMap
        // setFileMap((currentFileMap) => {
        //     const newFileMap = { ...currentFileMap };

        //     newFileMap[newFolderId] = {
        //         id: newFolderId,
        //         name: folderName,
        //         isDir: true,
        //         modDate: new Date(),
        //         parentId: currentFolderIdRef.current,
        //         childrenIds: [],
        //         childrenCount: 0,
        //     };

        //     const parent = newFileMap[currentFolderIdRef.current];
        //     if (parent) {
        //         newFileMap[currentFolderIdRef.current] = {
        //             ...parent,
        //             childrenIds: [...parent.childrenIds, newFolderId],
        //         };
        //     }

        //     return newFileMap;
        // });
    }, [dispatch, currentFolderIdRef]);

    const useFiles = useMemo(() => {
        if (fileMap && currentFolderId && fileMap[currentFolderId]) {
            const currentFolder = fileMap[currentFolderId];
            const childrenIds = currentFolder.childrenIds;
            const files = childrenIds.map((fileId) => fileMap[fileId]);
            return files;
        } else {
            return [];
        }
    }, [currentFolderId, fileMap]);

    const useFolderChain = useMemo(() => {
        if (fileMap && currentFolderId && fileMap[currentFolderId]) {
            const currentFolder = fileMap[currentFolderId];
            const folderChain = [currentFolder];

            let parentId = currentFolder.parentId;
            while (parentId) {
                const parentFile = fileMap[parentId];
                if (parentFile) {
                    folderChain.unshift(parentFile);
                    parentId = parentFile.parentId;
                } else {
                    break;
                }
            }

            return folderChain;
        } else {
            return [];
        }
    }, [currentFolderId, fileMap]);

    const useFileActionHandler = useCallback(
        (data) => {
            console.log(data);
            if (data.id === ChonkyActions.OpenFiles.id) {
                const { targetFile, files } = data.payload;
                const fileToOpen = targetFile || files[0];
                if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
                    setCurrentFolderId(fileToOpen.id);
                    return;
                } else {
                    console.log(fileToOpen);
                    // Handle file double-click here
                    setSelectedFile(fileToOpen);
                    setIsPreviewOpen(true);
                  }
            } else if (data.id === ChonkyActions.DeleteFiles.id) {
                deleteFiles(data.state.selectedFilesForAction);
            } else if (data.id === ChonkyActions.MoveFiles.id) {
                moveFiles(
                    data.payload.files,
                    data.payload.source,
                    data.payload.destination
                );
            } else if (data.id === ChonkyActions.CreateFolder.id) {
                const folderName = prompt('Provide the name for your new folder:');
                if (folderName) createFolder(folderName);
            }

            showActionNotification(data);
        },
        [createFolder, deleteFiles, moveFiles, setCurrentFolderId]
    );

    const showActionNotification = useCallback((data) => {
        console.log(data);
    }, []);

    const fileActions = useMemo(() => [ChonkyActions.CreateFolder, ChonkyActions.DeleteFiles], []);
    const thumbnailGenerator = useCallback(
        (file) =>
            file.thumbnailUrl ? `https://chonky.io${file.thumbnailUrl}` : null,
        []
    );

    const handleFileDrop = (files) => {
        // uploadFiles(files);
        console.log(files);
    };

    return (
        <div className="file-manager-container">
            <div className="file-manager-title">
                <h4>File Manager</h4>
            </div>

            <div className="file-manager">
                <div className="file-manager-window-container">
                        <FileUploader folder_id={currentFolderId} />
                        <FullFileBrowser
                            files={useFiles}
                            folderChain={useFolderChain}
                            fileActions={fileActions}
                            onFileAction={useFileActionHandler}
                            thumbnailGenerator={thumbnailGenerator}
                            onDrop={handleFileDrop}
                            {...props}
                        />
                        { selectedFile && <FilePreviewModal isOpen={isPreviewOpen} onClose={handleClosePreview} selectedFile={selectedFile} setSelectedFile={setSelectedFile} files={files.filter(file =>(!file.isDir))} /> }
                </div>
            </div>
        </div>
    );
};

export default FileManager;