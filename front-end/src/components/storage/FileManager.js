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
import VideoThumbnail from 'react-video-thumbnail';
import { useDispatch, useSelector } from 'react-redux';

// Set Chonky defaults
setChonkyDefaults({ iconComponent: ChonkyIconFA });

const FileManager = ({ smallManager }) => {
  const dispatch = useDispatch();
  const folders = useSelector(state => state.folder.folders);
  const files = useSelector(state => state.file.files);

  const [localFolders, setLocalFolders] = useState([]);
  const [localFiles, setLocalFiles] = useState([]);

  useEffect(() => {
    // Update local state when external props change
    setLocalFolders(folders || []);
    setLocalFiles(files || []);
  }, [folders, files]);

  // Combine folders and files for the children of a folder
  const combineFolderChildren = (folder) => {
    const folderChildren = folder.folders.map(childFolder => ({
      id: childFolder._id,
      name: childFolder.name,
      isDir: true,
      childrenCount: childFolder.folders.length,
    }));

    const fileChildren = localFiles
      .filter(file => (file.folder_id === folder._id) || (file.folder_id === null))
      .map(file => ({
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
  const chonkyFolders = localFolders.map(folder => ({
    id: folder._id,
    name: folder.name,
    isDir: true,
    childrenCount: folder.folders.length,
  }));

  // Convert files to Chonky-compatible format
  const chonkyFiles = localFiles.map(file => ({
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

  const renderThumbnail = (file) => {
    if (file.thumbnailUrl) {
      return <img src={file.thumbnailUrl} alt={file.name} />;
    } else if (file.type === 'video/mp4') {
      return <VideoThumbnail videoUrl={file.source} width={120} />;
    } else {
      return <div>{file.name}</div>;
    }
  };

  return (
    <div className="file-manager-container">
      {!smallManager && <div className="file-manager-title">
        <h4>File Manager</h4>
      </div>}

      <div className="file-manager">
        <div className="file-manager-window-container">
          {/* Apply styles to limit the size of the file manager */}
          <div style={{ maxHeight: '500px', overflow: 'auto' }}>
            <FileBrowser files={flatChonkyItems} folderChain={chonkyFolderChain} combineFolderChildren={combineFolderChildren}>
              <FileNavbar />
              <FileToolbar />
              <FileList renderFile={renderThumbnail} />
              <FileContextMenu />
            </FileBrowser>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileManager;
