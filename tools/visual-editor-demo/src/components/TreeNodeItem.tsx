import React, { useState } from 'react';
import { ComponentTreeNode } from '../types';
import { useEditorStore } from '../store/useEditorStore';
import { ChevronRight, ChevronDown, Box, Tag, Type, GripVertical } from './Hugeicons';

export interface TreeNodeItemProps {
  node: ComponentTreeNode;
  depth: number;
}

export const TreeNodeItem: React.FC<TreeNodeItemProps> = ({ node, depth }) => {
  const {
    selectedNodeId,
    expandedNodeIds,
    setSelectedNodeId,
    toggleNodeExpanded,
    searchQuery,
    showFrameworkInternals,
    reorderNodes,
  } = useEditorStore();

  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const isExpanded = expandedNodeIds.has(node.id);
  const isSelected = selectedNodeId === node.id;
  const hasChildren = node.children && node.children.length > 0;

  // Search query filter
  const matchesSearch = searchQuery === '' || node.name.toLowerCase().includes(searchQuery.toLowerCase());

  // Check if any child matches search
  const childMatchesSearch = (n: ComponentTreeNode): boolean => {
    if (n.name.toLowerCase().includes(searchQuery.toLowerCase())) return true;
    return n.children ? n.children.some(childMatchesSearch) : false;
  };

  const shouldRender = matchesSearch || (hasChildren && childMatchesSearch(node));
  if (!shouldRender) return null;

  // Framework internals filter
  if (!showFrameworkInternals && node.kind === 'custom-component' && (node.name.startsWith('Provider') || node.name.startsWith('Context'))) {
    return null;
  }

  const getIcon = () => {
    switch (node.kind) {
      case 'custom-component':
        return <Box size={13} className="text-purple-400 mr-1.5 shrink-0" />;
      case 'text-node':
        return <Type size={13} className="text-emerald-400 mr-1.5 shrink-0" />;
      default:
        return <Tag size={13} className="text-blue-400 mr-1.5 shrink-0" />;
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', node.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const sourceId = e.dataTransfer.getData('text/plain');
    if (sourceId && sourceId !== node.id) {
      reorderNodes(sourceId, node.id, 'inside');
    }
  };

  return (
    <div className="select-none">
      <div
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() =>
          { window.postMessage({type:'HIGHLIGHT_ELEMENT',payload:{sourceFile:node.sourceFile,line:node.sourceLine}}, '*'); setSelectedNodeId(node.id, {
            id: node.id,
            sourceFile: node.sourceFile,
            sourceLine: node.sourceLine,
            sourceColumn: node.sourceColumn,
            tagName: node.name,
            componentName: node.kind === 'custom-component' ? node.name : undefined,
            classList: node.classList || [],
            inlineStyles: {},
            boxModel: {
              margin: { top: 0, right: 0, bottom: 0, left: 0 },
              padding: { top: 0, right: 0, bottom: 0, left: 0 },
            },
            computedStyles: {},
            attributes: node.attributes || {},
          }); }
        }
        style={{ paddingLeft: `${depth * 14 + 6}px` }}
        className={`group flex items-center h-7 pr-2 cursor-pointer rounded text-sm transition-colors ${
          isSelected
            ? 'demo-layer-selected font-medium'
            : isDraggingOver
            ? 'demo-layer-selected'
            : 'demo-layer-row'
        }`}
      >
        {/* Expand / Collapse Chevron */}
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleNodeExpanded(node.id);
            }}
            className="demo-tree-toggle"
          >
            {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
          </button>
        ) : (
          <span className="w-4 shrink-0" />
        )}

        {/* Drag handle icon */}
        <GripVertical size={11} className="opacity-0 group-hover:opacity-60 mr-1 cursor-grab text-slate-400 shrink-0" />

        {/* Kind Icon */}
        {getIcon()}

        {/* Node Name */}
        <span className="truncate flex-1">{node.name}</span>

        {/* Source Location tag */}
        <span className="text-sm opacity-40 font-mono ml-2 shrink-0 group-hover:opacity-75">
          :{node.sourceLine}
        </span>
      </div>

      {/* Render Child Nodes recursive */}
      {hasChildren && isExpanded && (
        <div className="flex flex-col">
          {node.children.map((child) => (
            <TreeNodeItem key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
