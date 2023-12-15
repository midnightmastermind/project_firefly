import React, { useState, startTransition } from 'react';
import { MDXEditor, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin, imagePlugin, linkPlugin, diffSourcePlugin, toolbarPlugin, markdownShortcutPlugin,  InsertImage, InsertTable, UndoRedo, BoldItalicUnderlineToggles, DiffSourceToggleWrapper } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

const MarkdownEditor = () => {
  const [contentEditor, setContentEditor] = useState('');

  const handleEditorChange = (content) => {
    console.log('Content was updated:', content);
    setContentEditor(content);
  };

  const imageUploadHandler = async (image) => {
    const formData = new FormData();
    formData.append('image', image);

    // Use startTransition to indicate that the update is not urgent
    startTransition(() => {
      fetch('/uploads/new', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((json) => {
          // Handle the response as needed
        });
    });
  };


  // Example markdown with image
  const markdownWithImage = `
    Hello world!

    ![Alt text](https://example.com/image.jpg)
  `;

  return (
    <MDXEditor
      className="editor"
      markdown={contentEditor}
      onChange={handleEditorChange}
      contentEditableClassName="prose"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        imagePlugin({
          imageUploadHandler,
          imageAutocompleteSuggestions: [
            'https://picsum.photos/200/300',
            'https://picsum.photos/200',
          ],
        }),
        linkPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper className="markdown-toolbar">
              <InsertImage />
              <InsertTable />
              <UndoRedo />
              <BoldItalicUnderlineToggles />
            </DiffSourceToggleWrapper>
          ),
        }),
        diffSourcePlugin({
          diffMarkdown: 'An older version',
          viewMode: 'rich-text',
        }),
        markdownShortcutPlugin(),
      ]}
    />
  );
};

export default MarkdownEditor;
