import FileManager from 'components/storage/FileManager';
import TestMarkdown from 'components/tools/markdown_editor/MarkdownEditor';
import React, { useState } from 'react';

const CardEditor = ({ content, element }) => {
    return (
        <div />
    );
};

const ListEditor = ({ content, element }) => {
    //add in options for user, product, other elements
    //flex
    return (
        <div />
    );
};

const TextEditor = ({ content, element }) => {
    return (
        <TestMarkdown />
    );
};

const VideoEditor = ({ content, element }) => {
    // source, file uploader/storage
    // sizing
    return (
        <FileManager smallManager={true} />
    );
};

const ImageEditor = ({ content, element }) => {
    // source, file uploader/storage
    // sizing
    // make background-image instead of img
    return (
        <FileManager smallManager={true} />
    );
};

const ComponentEditor = ({ type, content, element }) => {
    //add in text over element option
    return (
        <div className="component-editor">
            {
                (type == 'text') ? ( <TextEditor />) : (type == 'video') ? <VideoEditor /> : (type == 'image') ? <ImageEditor /> : <div></div>
            }
        </div>
    );
};

export default ComponentEditor;