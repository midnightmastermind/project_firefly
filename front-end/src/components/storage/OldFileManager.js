import React, { useState, useEffect } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  create as createFolder,
  remove as removeFolder,
  update as updateFolder,
  getAll as getAllFolders
} from 'slices/storage/folder';
import {
  create as createFile,
  remove as removeFile,
  update as updateFile
} from 'slices/storage/file';
import { FileUploader } from './FileUploader';
import { ClipLoader } from 'react-spinners'
import { FormGroup, InputGroup, Breadcrumbs, Breadcrumb } from '@blueprintjs/core';
import {
  ContextMenu,
  Menu,
  MenuItem,
  Classes,
  Tree,
  Button,
  ButtonGroup,
  Dialog,
  Checkbox,
  Icon,
  IconSize
} from "@blueprintjs/core";
import shortid from "shortid";
import ReactPlayer from 'react-player'
import './file-manager.css';

const sampleData = [];

const FileManager = ({ smallManager }) => {
  const dispatch = useDispatch();
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [mainContent, setMainContent] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);

  const [isAddFolderFormOpen, setAddFolderFormOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const folders = useSelector(state => state.folder.folders);
  const files = useSelector(state => state.file.files);

  useEffect(() => {
    let clickedFolder = folders.find((folder) => folder._id === currentFolder);

    handleContentChange(clickedFolder);
  }, [folders, files]);

  const handleRenameFolder = (folderId, newFolderName) => {
    dispatch(updateFolder({ id: folderId, newName: newFolderName }));
  };

  const handleRenameFile = (fileId, newFileName) => {
    dispatch(updateFile({ id: fileId, newFileName }));
  };

  const handleNodeClick = (node) => {
    console.log(node);

    const folder = folders.find((folder) => folder._id === node.id);
    handleContentChange(folder);
  };

  const handleContentChange = (folder) => {
    console.log(folder);
    let folder_id = null;
    if (folder) {
      folder_id = folder._id;
    }

    if (folders && files) {
      const filesInFolder = files.filter((file) => file.folder_id == folder_id);

      let childFolders;
      if (folder) {
        childFolders = folder.folders.map(v => { return { ...v, type: 'folder' } });
      } else {
        childFolders = folders.map(v => { return { ...v, type: 'folder' } });
      }
      setMainContent([...childFolders, ...filesInFolder]);
      setCurrentFolder(folder_id);
    }
  }
  // ...

  const buildBreadcrumbs = (folders) => {
    const items = [];
    console.log(folders);

    let continueCrumbs = true;
    folders.map((folder) => {
      if (continueCrumbs) {
        if (folder._id != null) {
          items.push({
            icon: "folder-close",
            text: folder.name,
            _id: folder._id,
            folders: folder.folders
          });
        } else {
          items.push({
            icon: "home", // You can use a different icon for the root folder
            text: "Home",
            _id: folder._id,
            folders: folder.folders
          });
        }

        if (folder._id == currentFolder) {
          continueCrumbs = false;
        }
      }
    });

    return items;
  };

  const flattenFolders = (folder) => {
    console.log(folder);
    if (!folder) {
      return [];
    }

    const flattenedFolder = {
      _id: folder._id,
      name: folder.name,
      folders: folder.folders
    };

    let flattenedFolders = [flattenedFolder];

    if (folder.folders && folder.folders.length > 0) {
      const childFolders = folder.folders.map((child) => flattenFolders(child));
      flattenedFolders = flattenedFolders.concat(...childFolders);
    }

    return flattenedFolders;
  };


  // ...




  const createNewFolder = () => {
    dispatch(createFolder({ name: newFolderName, parent_id: currentFolder }))
      .unwrap()
      .then(data => {
        dispatch(getAllFolders());
        setAddFolderFormOpen(false);
      })
      .catch(e => {
        console.log(e);
      });
  }
  const renderChildren = (nodes) => {
    return nodes.map((node) => {
      {
        if (folders.find((item) => item.id === node.id)?.type == "folder")
          return (
            <div classNames={`${node.id == currentFolder ? 'selected-folder' : ''}`} key={node.id}>
              <div>{node.name}</div>
              {/* Include the ContextMenu JSX here */}
              <ContextMenu className={Classes.POPOVER_DISMISS}>
                <Menu>
                  <MenuItem
                    text="Rename"
                    onClick={() => {
                      const newName = prompt("Enter new name:");
                      if (newName) handleRenameFolder(node.id, newName);
                    }}
                  />
                </Menu>
              </ContextMenu>
              {node.folders && renderChildren(node.folders)} {/* Recursively render child nodes */}
            </div>
          )
      }
    });
  };

  const treeContents = folders.map((folder) => ({
    id: folder._id,
    label: folder.name,
    isExpanded: true,
    childNodes: folder.folders.map((child) => ({
      id: child.id,
      label: child.name,
      isExpanded: true,
      childNodes:
        child.folders && child.folders.length > 0
          ? renderChildren(child.folders)
          : undefined,
    })),
  }));

  return (
    <div className="file-manager-container">
      {!smallManager && <div className="file-manager-title">
        <h4>File Manager</h4>
      </div>
      }
      <div className="file-manager">
        <div className="file-manager-window-container">
          {!smallManager &&
            <div className="sidebar">
              <div className="sidebar-home"><Icon icon="home" iconSize={14} style={{ color: "white" }} /> Home</div>
              <Tree
                contents={treeContents}
                onNodeClick={handleNodeClick}
              />
            </div>
          }
          <div className="file-manager-window">
            <div className="file-uploader">
              <FileUploader folder_id={currentFolder} />
            </div>
            <div className="file-manager-toolbar tool-bar">
              <div>
                <Dialog
                  isOpen={isAddFolderFormOpen}
                  onClose={() => setAddFolderFormOpen(false)}
                  title="Add New Folder"
                >
                  <div className={Classes.DIALOG_BODY}>
                    <FormGroup label="Folder Name">
                      <InputGroup
                        type="text"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                      />
                    </FormGroup>
                  </div>
                  <div className={Classes.DIALOG_FOOTER}>
                    <Button onClick={() => createNewFolder()} intent="primary">
                      Create Folder
                    </Button>
                  </div>
                </Dialog>
                <Button onClick={() => setAddFolderFormOpen(true)}>New Folder</Button>
              </div>
              {folders && <div>
                <Breadcrumbs
                  items={buildBreadcrumbs(flattenFolders({ _id: null, folders: folders }))}
                  className={'breadcrumbs'}
                  collapseFrom="start"

                  breadcrumbRenderer={({ _id, text, ...restProps }) => (
                    <Breadcrumb current={currentFolder == _id} size={14} onClick={() => handleContentChange({ _id, text, ...restProps })}
                      {...restProps}>{text} </Breadcrumb>
                  )}
                />
              </div>
              }
            </div>
            <div className="main-content">
              {mainContent.length == 0 && <div>Nothing</div>}
              {mainContent.map((item) => {
                if (item.type == undefined) {
                  console.log(item);
                }
                console.log(item.type);
                if (item?.type === "folder") {
                  return (
                    <div className="folder" onClick={() => handleContentChange(item)} key={item._id}>
                      <Icon icon="folder-close" iconSize={135} style={{ color: "white" }} />
                      <div className="folder-name">{item.name}</div>
                      {/* Include the ContextMenu JSX here */}
                      {/* <ContextMenu className={Classes.POPOVER_DISMISS}>
                        <Menu>
                          <MenuItem
                            text="Rename"
                            onClick={() => {
                              const newName = prompt("Enter new name:");
                              if (newName) handleRenameFolder(item.id, newName);
                            }}
                          />
                        </Menu>
                      </ContextMenu> */}
                    </div>
                  );
                } else if (item?.type.includes("video")) {
                  return (
                    <div className="video-file file" key={item._id}>
                      {(item.source !== null) ? (
                        <ReactPlayer url={item.source} />

                      ) : (
                        <div className="loading-icon"><ClipLoader color="#36d7b7" /></div>
                      )
                      }
                      <div className="file-name">{item.name}</div>
                    </div>
                  );
                } else if (item?.type.includes('image')) {
                  return (
                    <div className="image-file file" key={item._id}>
                      <img
                        src={item.source} // Sample image source
                        alt={`Image ${item.name}`}
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                      <div className="file-name">{item.name}</div>
                    </div>
                  );
                } else {
                  return (
                    <div className="file" key={item._id}>
                      <Icon icon="document" iconSize={120} style={{ color: "white" }} />
                      <div className="file-name">{item.name}</div>
                      {/* Include the ContextMenu JSX here */}
                      {/* <ContextMenu className={Classes.POPOVER_DISMISS}>
                        <Menu>
                          <MenuItem
                            text="Rename"
                            onClick={() => {
                              const newName = prompt("Enter new name:");
                              if (newName) handleRenameFile(item.id, newName);
                            }}
                          />
                        </Menu>
                      </ContextMenu> */}
                    </div>
                  );
                }
              })
              }
            </div>
          </div>
        </div>
      </div>
      <Dialog isOpen={isMultiSelect} onClose={() => setIsMultiSelect(false)}>
        <div className={Classes.DIALOG_BODY}>
          <Checkbox label="Select All" />
          {/* Logic for selecting multiple files and folders */}
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <Button intent="primary" onClick={() => setIsMultiSelect(false)}>
            Confirm
          </Button>
          <Button intent="danger" onClick={() => setIsMultiSelect(false)}>
            Cancel
          </Button>
        </div>
      </Dialog>
    </div>
  );
}

export default FileManager;

