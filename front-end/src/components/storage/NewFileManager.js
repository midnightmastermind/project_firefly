// FileManager.js
import React, { useEffect, useState } from 'react';
import {
  FileBrowser,
  FileContextMenu,
  FileList,
  FileNavbar,
  FileToolbar,
} from 'chonky';
import { setChonkyDefaults } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import { Dialog, Classes } from '@blueprintjs/core';
import { useDispatch, useSelector } from 'react-redux';
import VideoThumbnail from 'react-video-thumbnail';
import { FileUploader } from './FileUploader';
// Set Chonky defaults
setChonkyDefaults({ iconComponent: ChonkyIconFA });

// Dynamic imports for the content components
const VideoComponent = React.lazy(() => import('./VideoComponent'));
const ImageComponent = React.lazy(() => import('./ImageComponent'));
const DocumentComponent = React.lazy(() => import('./DocumentComponent'));


const FileManager = ({ smallManager, onSelectFile }) => {
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.folder.folders);
  const files = useSelector((state) => state.file.files);

  const [localFolders, setLocalFolders] = useState([]);
  const [localFiles, setLocalFiles] = useState([]);

  useEffect(() => {
    // Update local state when external props change
    setLocalFolders(folders || []);
    setLocalFiles(files || []);
  }, [folders, files]);

  const renderThumbnail = (file, onDoubleClick) => {
    return (
      <div
        className="chonky-file-entry-thumbnail"
        onDoubleClick={() => onDoubleClick(file)}
      >
        {/* Your existing thumbnail rendering logic goes here */}
        {file.thumbnailUrl ? (
          <img src={file.thumbnailUrl} alt={file.name} />
        ) : file.type === 'video/mp4' ? (
          <VideoThumbnail videoUrl={file.source} width={120} />
        ) : (
          <div>{file.name}</div>
        )}
      </div>
    );
  };

  // Combine folders and files for the children of a folder
  const combineFolderChildren = (folder) => {
    const folderChildren = folder.folders.map((childFolder) => ({
      id: childFolder._id,
      name: childFolder.name,
      isDir: true,
      childrenCount: childFolder.folders.length,
    }));

    const fileChildren = localFiles
      .filter(
        (file) =>
          file.folder_id === folder._id || file.folder_id === null
      )
      .map((file) => ({
        id: file._id,
        name: file.name,
        size: file.size || null,
        type: file.type || null,
        uploadProgress: file.uploadProgress || 0,
        createdAt: file.createdAt || null,
        updatedAt: file.updatedAt || null,
        source: file.source || null,
        folder_id: file.folder_id || null,
      }));

    return [...folderChildren, ...fileChildren];
  };

  // Convert folders to Chonky-compatible format
  const chonkyFolders = localFolders.map((folder) => ({
    id: folder._id,
    name: folder.name,
    isDir: true,
    childrenCount: folder.folders.length,
  }));

  // Convert files to Chonky-compatible format
  const chonkyFiles = localFiles.map((file) => ({
    id: file._id,
    name: file.name,
    size: file.size || null,
    type: file.type || null,
    uploadProgress: file.uploadProgress || 0,
    createdAt: file.createdAt || null,
    updatedAt: file.updatedAt || null,
    source: file.source || null,
    folder_id: file.folder_id || null,
  }));

  // Create a flat array of all files and folders
  const flatChonkyItems = [...chonkyFolders, ...chonkyFiles];

  const chonkyFolderChain = [
    // Dummy root folder
    {
      id: 'root-folder',
      name: 'Root Folder',
      isDir: true,
      childrenCount: flatChonkyItems.length,
    },
    ...chonkyFolders,
  ];

  // State to manage the visibility of the dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // State to manage the content to be displayed in the dialog
  const [dialogContent, setDialogContent] = useState(null);

  // Function to handle double-click on a thumbnail
  const handleThumbnailDoubleClick = (file) => {
    // Determine the content based on file type
    let ContentComponent;

    if (onSelectFile !== undefined) {
      onSelectFile(file);
    } else {
      if (file.type === 'video/mp4') {
        ContentComponent = VideoComponent;
      } else if (file.type && file.type.startsWith('image/')) {
        ContentComponent = ImageComponent;
      } else {
        ContentComponent = DocumentComponent;
      }
      // Set the content and show the dialog
      setDialogContent(<ContentComponent {...file} />);
      setIsDialogOpen(true);
    }
  };

  return (
    <div className="file-manager-container">
      {!smallManager && (
        <div className="file-manager-title">
          <h4>File Manager</h4>
        </div>
      )}

      <div className="file-manager">
        <div className="file-manager-window-container">
          <div style={{ maxHeight: '500px', overflow: 'auto' }}>
            <FileUploader />
            <FileBrowser
              files={flatChonkyItems}
              folderChain={chonkyFolderChain}
              combineFolderChildren={combineFolderChildren}
            >
              <FileNavbar />
              <FileToolbar />
              {/* Pass the double-click handler to renderFile */}
              <FileList
                renderFile={(file) =>
                  renderThumbnail(file, handleThumbnailDoubleClick)
                }
              />
              <FileContextMenu />
            </FileBrowser>
          </div>
        </div>
      </div>

      {/* Render the dialog directly in FileManager using Blueprint.js Dialog */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setDialogContent(null);
        }}
        className={Classes.DARK}
      >
        <div className={Classes.DIALOG_BODY}>{dialogContent}</div>
      </Dialog>
    </div>
  );
};

export default FileManager;
