import React, { useState, useEffect } from 'react';
import { Tree, Classes } from '@blueprintjs/core';
import EditorComponent from './popovers/EditorComponent';

const EditComponent = ({ setSelectedNodePreview, page, updateObjectPropertiesById, getObjectPropertiesById}) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState([]);

  // useEffect(() => {
  //   const startExpanded = [];
  //   if (page) {
  //     [page].map((node) => {
  //       startExpanded.push(node.id);
  //     });
  //     setExpandedNodes(startExpanded);
  //   }
  // }, [page])

  const handleNodeClick = (node) => {
     setSelectedNode(node);
  };

  const handleNodeEnter = (node) => {
    setSelectedNodePreview(node.id);
  };

  const handleNodeLeave = (node) => {
    setSelectedNodePreview(null);
  };

  const handleNodeExpand = (node) => {
    if (!expandedNodes.includes(node.id)) {
      setExpandedNodes([...expandedNodes, node.id]);
    }
  };

  const handleNodeCollapse = (node) => {
    setExpandedNodes(expandedNodes.filter((id) => id !== node.id));
  };

  const renderChildren = (nodes) => {
    return nodes.map((node) => ({
      id: node.id,
      key: node.id,
      label: node.type,
      isExpanded: expandedNodes.includes(node.id),
      hasCaret: node.children && node.children.length > 0, // Updated line
      childNodes: node.children ? renderChildren(node.children) : undefined,
      className: "child-node"
    }));
  };

  const renderSelectedNodeDetails = () => {
    if (selectedNode) {
      return (
        <div style={{ marginTop: '20px' }}>
          <pre>ID: {selectedNode?.id}</pre>
            <EditorComponent selectedNode={selectedNode?.id} page={page} updateObjectPropertiesById={updateObjectPropertiesById} getObjectPropertiesById={getObjectPropertiesById} />
        </div>
      );
    }
    return null;
  };

  const treeContents = [page].map((node) => ({
    id: node.id,
    label: node.type,
    isExpanded: expandedNodes.includes(node.id),
    hasCaret: node.children && node.children.length > 0, // Updated line
    childNodes: node.children ? renderChildren(node.children) : [],
  }));

  return (
    <div className={"editor-tree"}>
      <Tree
        contents={treeContents}
        onNodeClick={handleNodeClick}
        onNodeExpand={handleNodeExpand}
        onNodeCollapse={handleNodeCollapse}
        onNodeMouseEnter={handleNodeEnter}
        onNodeMouseLeave={handleNodeLeave}
      />
      {renderSelectedNodeDetails()}
    </div>
  );
};

export default EditComponent;

