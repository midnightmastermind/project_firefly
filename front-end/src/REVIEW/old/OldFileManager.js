import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { create as createFolder, remove as removeFolder, update as updateFolder } from 'slices/storage/folder';
import { create as createFile, remove as removeFile, update as updateFile } from 'slices/storage/file';
import { FileUploader } from '../components/tools/storage/FileUploader';
import { ContextMenu, Menu, MenuItem, Classes, Tree } from "@blueprintjs/core";
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import './file-manager.css';

// Sample Data
const sampleFolders = [
  { id: 1, folderName: "Folder 1", files: [1, 2], folders: [] },
  { id: 2, folderName: "Folder 2", files: [3, 4], folders: [] },
];

const sampleFiles = [
  { id: 1, type: "image", size: 1024, uploadedSize: 512, source: "path/to/image.jpg" },
  { id: 2, type: "document", size: 2048, uploadedSize: 1024, source: "path/to/document.pdf" },
  { id: 3, type: "video", size: 4096, uploadedSize: 2048, source: "path/to/video.mp4" },
  { id: 4, type: "audio", size: 512, uploadedSize: 256, source: "path/to/audio.mp3" },
];

// Folder component
const Folder = ({ folder, handleRenameFolder }) => {
  const dispatch = useDispatch();
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const handleDeleteFolder = (folderId) => {
    dispatch(removeFolder(folderId));
  };

  return (
    <div>
      <div onContextMenu={(e) => { e.preventDefault(); setIsContextMenuOpen(true); }}>
        <span>{folder.folderName}</span>
      </div>
      <button onClick={() => handleDeleteFolder(folder.id)}>Delete</button>
      <ContextMenu
        className={Classes.POPOVER_DISMISS}
        isOpen={isContextMenuOpen}
        onClose={() => setIsContextMenuOpen(false)}
      >
        <Menu>
          <MenuItem
            text="Rename"
            onClick={() => handleRenameFolder(folder.id, newFolderName)}
            shouldDismissPopover={false}
          />
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="New Name"
          />
        </Menu>
      </ContextMenu>
    </div>
  );
};

// File component
const File = ({ file, handleRenameFile }) => {
  const dispatch = useDispatch();
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const handleDeleteFile = (fileId) => {
    dispatch(removeFile(fileId));
  };

  return (
    <div>
      <div onContextMenu={(e) => { e.preventDefault(); setIsContextMenuOpen(true); }}>
        <span>{file.type}</span>
      </div>
      <button onClick={() => handleDeleteFile(file.id)}>Delete</button>
      <ContextMenu
        className={Classes.POPOVER_DISMISS}
        isOpen={isContextMenuOpen}
        onClose={() => setIsContextMenuOpen(false)}
      >
        <Menu>
          <MenuItem
            text="Rename"
            onClick={() => handleRenameFile(file.id, newFileName)}
            shouldDismissPopover={false}
          />
          <input
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            placeholder="New Name"
          />
        </Menu>
      </ContextMenu>
    </div>
  );
};

// Usage of Folder and File components in FileManager
const FileManager = () => {
  // const folders = useSelector((state) => state.folder.folders) || sampleFolders; // Assuming you have the file system state
  const folders = sampleFolders;
  const files = sampleFiles;
  // const files = useSelector((state) => state.file.files) || sampleFiles; // Assuming you have the file system state
  const dispatch = useDispatch();
  const [newFolderName, setNewFolderName] = useState('');

  const handleCreateFolder = () => {
    dispatch(createFolder());
  };

  const handleRenameFolder = (folderId, newFolderName) => {
    const existingFolder = folders.find((folder) => folder.id === folderId);

    if (existingFolder) {
      const isFolderNameExists = folders.some((folder) => folder.folderName === newFolderName);
      if (isFolderNameExists) {
        let count = 1;
        let newName = `${newFolderName}_${count}`;
        while (folders.some((folder) => folder.folderName === newName)) {
          count++;
          newName = `${newFolderName}_${count}`;
        }
        dispatch(updateFolder({ id: folderId, newName }));
      } else {
        dispatch(updateFolder({ id: folderId, newName: newFolderName }));
      }
    }
  };

  const handleRenameFile = (fileId, newFileName) => {
    const existingFile = files.find((file) => file.id === fileId);

    if (existingFile) {
      const isFileNameExists = files.some((file) => file.fileName === newFileName);
      if (isFileNameExists) {
        let count = 1;
        let newName = `${newFileName}_${count}`;
        while (files.some((file) => file.fileName === newName)) {
          count++;
          newName = `${newFileName}_${count}`;
        }
        dispatch(updateFile({ id: fileId, newFileName: newName }));
      } else {
        dispatch(updateFile({ id: fileId, newFileName }));
      }
    }
  };

 const [selectedNode, setSelectedNode] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState([]);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const handleNodeEnter = (node) => {
    // Logic for handling node mouse enter
  };

  const handleNodeLeave = (node) => {
    // Logic for handling node mouse leave
  };

  const handleNodeExpand = (node) => {
    if (!expandedNodes.includes(node.id)) {
      setExpandedNodes([...expandedNodes, node.id]);
    }
  };

  const handleNodeCollapse = (node) => {
    setExpandedNodes(expandedNodes.filter((id) => id !== node.id));
  };

  const renderContextMenu = (itemType, id) => {
    const handleRename = (id, newName) => {
      if (itemType === 'folder') {
        handleRenameFolder(id, newName);
      } else if (itemType === 'file') {
        handleRenameFile(id, newName);
      }
    };

    return (
      <ContextMenu className={Classes.POPOVER_DISMISS}>
        <Menu>
          <MenuItem
            text="Rename"
            onClick={() => {
              const newName = prompt('Enter new name:');
              if (newName) handleRename(id, newName);
            }}
          />
        </Menu>
      </ContextMenu>
    );
  };

  const renderChildren = (nodes) => {
    return nodes.map((node) => (
      <div key={node.id}>
        <div>{node.type}</div>
        {renderContextMenu('node', node.id)}
      </div>
    ));
  };

  const treeContents = [page].map((node) => ({
    id: node.id,
    label: node.type,
    isExpanded: expandedNodes.includes(node.id),
    hasCaret: node.children && node.children.length > 0,
    childNodes: renderChildren(node.children),
  }));

  return (
    <div className="file-manager-container">
      <div className="file-manager-title">
        <h4>File Manager</h4>
      </div>
      <div className="file-manager">
        <div className="tool-bar">
          <button onClick={handleCreateFolder}>Create Folder</button>
        </div>
        <div className="file-uploader">
          <FileUploader />
        </div>
        <div className="sidebar">
          <Tree
            contents={treeContents}
            onNodeClick={handleNodeClick}
            onNodeExpand={handleNodeExpand}
            onNodeCollapse={handleNodeCollapse}
            onNodeMouseEnter={handleNodeEnter}
            onNodeMouseLeave={handleNodeLeave}
          />
        </div>
        <div className="main-content">
          {folders.map((folder) => (
            <div key={folder.id}>
              <div>{folder.folderName}</div>
              {renderContextMenu('folder', folder.id)}
            </div>
          ))}
          {files.map((file) => (
            <div key={file.id}>
              <div>{file.type}</div>
              {renderContextMenu('file', file.id)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileManager;