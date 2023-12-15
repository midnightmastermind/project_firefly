// googleDrive.js
const { google } = require('googleapis');
const fs = require('fs');

const credentials = require('./path_to_credentials.json'); // Path to your Google API credentials JSON file
const token = require('./path_to_token.json'); // Path to your Google API token JSON file

const auth = new google.auth.OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
);
auth.setCredentials(token);

const drive = google.drive({ version: 'v3', auth });

const uploadToDrive = (file) => {
  const fileMetadata = {
    name: file.filename,
  };
  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: 'id',
    },
    (err, uploadedFile) => {
      if (err) {
        console.error('Error uploading file to Google Drive:', err);
      } else {
        console.log('File uploaded to Google Drive with ID:', uploadedFile.data.id);
        // Update the file's Google Drive ID in the database if needed
      }
    }
  );
};

module.exports = { uploadToDrive };
