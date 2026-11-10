import { IconButton } from './IconButton';
import React from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { translations } from '../i18n/translations';
import { TreeNodeItem } from './TreeNodeItem';
import { Search, Filter, Layers, ChevronDown, ChevronRight } from './Hugeicons';

export const LayerTree: React.FC = () => {
  const {
    treeData,
    searchQuery,
    setSearchQuery,
    expandAllNodes,
    collapseAllNodes,
    showFrameworkInternals,
    setShowFrameworkInternals,
    language,
  } = useEditorStore();

  const t = translations[language];

  return (
    <div className="w-72 h-full bg-slate-900 border-r border-slate-800 flex flex-col text-slate-200 select-none">
      {/* Search Bar */}
      <div className="p-2 border-b border-slate-800">
        <div className="relative flex items-center">
          <Search size={13} className="absolute left-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-slate-950 text-sm text-slate-200 pl-8 pr-3 py-1.5 rounded border border-slate-800 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Layer Tree List */}
      <div className="flex-1 overflow-y-auto p-1.5 scrollbar-thin scrollbar-thumb-slate-800">
        {treeData ? (
          <TreeNodeItem node={treeData} depth={0} />
        ) : (
          <div className="p-6 text-center text-sm text-slate-500 flex flex-col items-center gap-2">
            <Layers size={24} className="opacity-40" />
            <span>{t.noLayers}</span>
          </div>
        )}
      </div>
    </div>
  );
};

