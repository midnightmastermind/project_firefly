import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToQueue, getAll as getAllFiles, removeFromQueue, uploadFile, getUploadProgress } from 'slices/storage/file'; // Make sure to import the necessary functions
import { FileDrop } from 'react-file-drop'; // Make sure to import the FileDrop component
import { Icon, IconSize } from "@blueprintjs/core";

export const FileUploader = ({folder_id}) => {
  const styles = { width: '100%', color: 'black' };
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleUploadProgress = (fileId, progress) => {
    const oldUploadProgress = {...uploadProgress};
    oldUploadProgress[fileId] = progress;
    setUploadProgress({...oldUploadProgress});
  }
  const uploadFiles = async (files) => {
    setLoading(true);
    const progressMap = {};
  
    const uploadFileWithProgress = async (file) => {
      try {
        const fileId = Date.now(); // Generate a unique ID for the file
        dispatch(
          addToQueue({
            id: fileId,
            // file: createdFile, // Adjust according to your response structure
            localFile: file,
          })
        );

        const oldFileProgress = uploadProgress;
        oldFileProgress[fileId] = 0;
        setUploadProgress(oldFileProgress);
        const createdFilePromise = dispatch(uploadFile({folder_id, fileData: file, fileId, callbackFunction: handleUploadProgress}));
        createdFilePromise.then((response) => {
          if (response) {
            let createdFile = response.payload.savedFile;

            // Get upload progress
            const interval = setInterval(async () => {
              try {
                
                const progressPromise = dispatch(getUploadProgress(createdFile._id));
                progressPromise.then((response) => {
                  const progress = response.payload.uploadProgress;
                  progressMap[fileId] = progress;
                  setUploadProgress({ ...progressMap });
                  if (progress === 100) {
                    clearInterval(interval);
                    // Remove from queue after upload is complete
                    dispatch(removeFromQueue({ id: fileId }));
                    dispatch(getAllFiles());

                  }
                });
                
              } catch (error) {
                // Handle error while getting upload progress
                console.error("Error getting upload progress:", error);
              }
            }, 1000);
          } else {
            // Handle the failure to create the file
          }
        });
      } catch (error) {
        // Handle the failure to upload the file
        console.error("Error uploading file:", error);
      }
    };
  
    for (const file of files) {
      await uploadFileWithProgress(file);
    }
  
    setLoading(false);
  };
  
  const onFileInputChange = (event) => {
    const { files } = event.target;
    uploadFiles(files);
  };

  const onTargetClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="file-uploader-container">
      <div style={styles}>
        {loading && <div>Loading...</div>}
        <FileDrop
          onTargetClick={onTargetClick}
          onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
          onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
          onFrameDrop={(event) => console.log('onFrameDrop', event)}
          onDragOver={(event) => console.log('onDragOver', event)}
          onDragLeave={(event) => console.log('onDragLeave', event)}
          onDrop={(files, event) => uploadFiles(files)}
        >
          <div className="file-uploader-plus-button-container">
            <div><Icon className="cloud-upload" size={IconSize.LARGE} icon="cloud-upload"/></div>
          </div>
          <div className="file-uploader-dropbox-title"><span>Choose a file</span> or Drag it here</div>

          <input className="file-uploader-browse-button" onChange={onFileInputChange} ref={fileInputRef} type="file" />
        </FileDrop>
        <div className="upload-progress-container">
          {uploadProgress && Object.keys(uploadProgress).map((fileId) => {
            if (uploadProgress[fileId] !== 100) {
              return (<div className="upload-progress" key={fileId}>
              <div>File ID: {fileId}</div>
              <progress value={uploadProgress[fileId]} max="100" />
            </div>);
            }
          }
          )}
        </div>
      </div>
    </div>
  );
};

