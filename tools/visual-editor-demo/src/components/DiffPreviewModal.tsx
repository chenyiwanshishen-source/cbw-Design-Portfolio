import React, { useState, useEffect } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { translations } from '../i18n/translations';
import { DiffFile, CodeDiffChunk, DiffLine } from '../types';
import { X, Check, FileCode, CheckSquare, Square, GitCommit, Columns, AlignJustify } from './Hugeicons';

export const DiffPreviewModal: React.FC = () => {
  const {
    diffModalOpen,
    setDiffModalOpen,
    diffs,
    ipcClient,
    language,
  } = useEditorStore();

  const t = translations[language];

  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'unified' | 'split'>('unified');
  const [approvedChunkIds, setApprovedChunkIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const initial = new Set<string>();
    diffs.forEach((file) => {
      file.chunks?.forEach((chunk) => initial.add(chunk.id));
    });
    setApprovedChunkIds(initial);
  }, [diffs]);

  if (!diffModalOpen || !diffs || diffs.length === 0) return null;

  const currentFile: DiffFile = diffs[activeFileIndex] || diffs[0];

  const toggleChunk = (chunkId: string) => {
    setApprovedChunkIds((prev) => {
      const next = new Set(prev);
      if (next.has(chunkId)) {
        next.delete(chunkId);
      } else {
        next.add(chunkId);
      }
      return next;
    });
  };

  const toggleSelectAllForCurrentFile = () => {
    if (!currentFile.chunks) return;
    const allChunkIds = currentFile.chunks.map((c) => c.id);
    const allSelected = allChunkIds.every((id) => approvedChunkIds.has(id));

    setApprovedChunkIds((prev) => {
      const next = new Set(prev);
      allChunkIds.forEach((id) => {
        if (allSelected) {
          next.delete(id);
        } else {
          next.add(id);
        }
      });
      return next;
    });
  };

  const handleApprove = () => {
    if (ipcClient) {
      const transactionId = (currentFile as any).transactionId || `tx-${Date.now()}`;
      ipcClient.sendNotification('CONFIRM_WRITE_BACK', {
        transactionId,
        approved: true,
        approvedChunkIds: Array.from(approvedChunkIds),
      });
    }
    setDiffModalOpen(false);
  };

  const handleReject = () => {
    if (ipcClient) {
      const transactionId = (currentFile as any).transactionId || `tx-${Date.now()}`;
      ipcClient.sendNotification('CONFIRM_WRITE_BACK', {
        transactionId,
        approved: false,
        approvedChunkIds: [],
      });
    }
    setDiffModalOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6 select-none animate-in fade-in duration-150"
      data-testid="diff-preview-modal"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-purple-950/60 border border-purple-800/50 rounded-lg text-purple-400">
              <GitCommit size={18} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white tracking-tight">{t.diffTitle}</h2>
              <p className="text-sm text-slate-400">
                {t.diffSubtitle} ({diffs.length} file{diffs.length > 1 ? 's' : ''})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-sm">
              <button
                onClick={() => setViewMode('unified')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-colors ${
                  viewMode === 'unified' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                }`}
                data-testid="view-mode-unified"
                title="Unified View"
              >
                <AlignJustify size={14} />
                <span>Unified</span>
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-colors ${
                  viewMode === 'split' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                }`}
                data-testid="view-mode-split"
                title="Side-by-Side Split View"
              >
                <Columns size={14} />
                <span>Side-by-Side</span>
              </button>
            </div>

            <button
              onClick={handleReject}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              title="Close Preview Modal (Esc)"
              data-testid="modal-close-button"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* File Tabs Navigation Bar */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950 px-2 overflow-x-auto shrink-0 scrollbar-none">
          {diffs.map((file, idx) => {
            const isActive = idx === activeFileIndex;
            return (
              <button
                key={file.file || idx}
                onClick={() => setActiveFileIndex(idx)}
                className={`flex items-center space-x-2 px-3.5 py-2.5 text-sm font-medium border-b-2 transition-colors shrink-0 ${
                  isActive
                    ? 'border-blue-500 text-white bg-slate-900/60'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                }`}
                data-testid={`file-tab-${idx}`}
              >
                <FileCode size={14} className={isActive ? 'text-blue-400' : 'text-slate-500'} />
                <span className="font-mono text-[11.5px]">{file.file}</span>
                <div className="flex items-center space-x-1 text-sm font-mono">
                  <span className="text-emerald-400 font-semibold">+{file.additionsCount || 0}</span>
                  <span className="text-rose-400 font-semibold">-{file.deletionsCount || 0}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Diff Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm bg-slate-950/40">
          {/* File Toolbar */}
          <div className="flex items-center justify-between bg-slate-900/80 px-3 py-2 border border-slate-800 rounded-lg">
            <div className="flex items-center space-x-2 text-slate-300">
              <span className="font-semibold text-slate-200">{currentFile.file}</span>
            </div>
            {currentFile.chunks && currentFile.chunks.length > 0 && (
              <button
                onClick={toggleSelectAllForCurrentFile}
                className="flex items-center space-x-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                data-testid="toggle-all-chunks"
              >
                {currentFile.chunks.every((c) => approvedChunkIds.has(c.id)) ? (
                  <CheckSquare size={14} className="text-blue-400" />
                ) : (
                  <Square size={14} className="text-slate-500" />
                )}
                <span>Toggle All Chunks</span>
              </button>
            )}
          </div>

          {/* Render Diff Chunks or Fallback Patch */}
          {currentFile.chunks && currentFile.chunks.length > 0 ? (
            currentFile.chunks.map((chunk, cIdx) => {
              const isChunkApproved = approvedChunkIds.has(chunk.id);
              return (
                <div
                  key={chunk.id || cIdx}
                  className={`border rounded-lg overflow-hidden transition-all ${
                    isChunkApproved
                      ? 'border-slate-800 bg-slate-900/40'
                      : 'border-slate-800/50 bg-slate-950/40 opacity-60'
                  }`}
                  data-testid={`diff-chunk-${chunk.id}`}
                >
                  {/* Chunk Header */}
                  <div className="bg-slate-900 border-b border-slate-800/80 px-3 py-1.5 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleChunk(chunk.id)}
                        className="text-slate-400 hover:text-white transition-colors"
                        data-testid={`chunk-checkbox-${chunk.id}`}
                      >
                        {isChunkApproved ? (
                          <CheckSquare size={14} className="text-blue-400" />
                        ) : (
                          <Square size={14} className="text-slate-500" />
                        )}
                      </button>
                      <span className="text-slate-400 font-mono">
                        Chunk #{cIdx + 1}: Lines {chunk.startLineOriginal}–{chunk.endLineOriginal} → {chunk.startLineModified}–{chunk.endLineModified}
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-sm font-semibold ${
                      isChunkApproved ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isChunkApproved ? 'Included in Write-Back' : 'Excluded'}
                    </span>
                  </div>

                  {/* Line Viewer: Unified vs Split */}
                  {viewMode === 'unified' ? (
                    <div className="divide-y divide-slate-900/50 font-mono leading-relaxed" data-testid="unified-diff-view">
                      {chunk.lines && chunk.lines.length > 0 ? (
                        chunk.lines.map((line, lIdx) => (
                          <div
                            key={lIdx}
                            className={`flex items-stretch text-sm ${
                              line.type === 'add'
                                ? 'bg-emerald-950/30 text-emerald-300 border-l-2 border-emerald-500'
                                : line.type === 'delete'
                                ? 'bg-rose-950/30 text-rose-300 border-l-2 border-rose-500'
                                : 'text-slate-400 hover:bg-slate-900/30'
                            }`}
                          >
                            <div className="w-10 px-1 py-0.5 text-right select-none text-slate-600 bg-slate-950/40 shrink-0 border-r border-slate-800/40 text-sm">
                              {line.originalLineNumber || ''}
                            </div>
                            <div className="w-10 px-1 py-0.5 text-right select-none text-slate-600 bg-slate-950/40 shrink-0 border-r border-slate-800/40 text-sm">
                              {line.modifiedLineNumber || ''}
                            </div>
                            <div className="w-6 py-0.5 text-center shrink-0 select-none font-bold">
                              {line.type === 'add' && <span className="text-emerald-400">+</span>}
                              {line.type === 'delete' && <span className="text-rose-400">-</span>}
                            </div>
                            <div className="px-2 py-0.5 whitespace-pre overflow-x-auto flex-1 font-mono">
                              {line.content}
                            </div>
                          </div>
                        ))
                      ) : (
                        <>
                          {chunk.originalLines?.map((orig, oIdx) => (
                            <div key={`orig-${oIdx}`} className="flex items-stretch text-sm bg-rose-950/30 text-rose-300 border-l-2 border-rose-500">
                              <div className="w-10 px-1 py-0.5 text-right text-slate-600 border-r border-slate-800/40 text-sm">
                                {chunk.startLineOriginal + oIdx}
                              </div>
                              <div className="w-10 px-1 py-0.5 text-right text-slate-600 border-r border-slate-800/40 text-sm"></div>
                              <div className="w-6 py-0.5 text-center font-bold text-rose-400">-</div>
                              <div className="px-2 py-0.5 whitespace-pre flex-1 font-mono">{orig}</div>
                            </div>
                          ))}
                          {chunk.modifiedLines?.map((mod, mIdx) => (
                            <div key={`mod-${mIdx}`} className="flex items-stretch text-sm bg-emerald-950/30 text-emerald-300 border-l-2 border-emerald-500">
                              <div className="w-10 px-1 py-0.5 text-right text-slate-600 border-r border-slate-800/40 text-sm"></div>
                              <div className="w-10 px-1 py-0.5 text-right text-slate-600 border-r border-slate-800/40 text-sm">
                                {chunk.startLineModified + mIdx}
                              </div>
                              <div className="w-6 py-0.5 text-center font-bold text-emerald-400">+</div>
                              <div className="px-2 py-0.5 whitespace-pre flex-1 font-mono">{mod}</div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  ) : (
                    /* Side-by-Side (Split) View */
                    <div className="grid grid-cols-2 divide-x divide-slate-800 font-mono text-sm" data-testid="split-diff-view">
                      {/* Left Column: Original */}
                      <div className="bg-slate-950/60 divide-y divide-slate-900/40">
                        <div className="bg-slate-900/90 px-3 py-1 font-semibold text-slate-400 text-sm uppercase tracking-wider border-b border-slate-800">
                          Original
                        </div>
                        {chunk.originalLines?.map((line, idx) => (
                          <div key={idx} className="flex items-stretch bg-rose-950/30 text-rose-300">
                            <div className="w-10 px-1 py-0.5 text-right text-slate-600 bg-slate-950/80 border-r border-slate-800/40 text-sm select-none shrink-0">
                              {chunk.startLineOriginal + idx}
                            </div>
                            <div className="w-5 py-0.5 text-center text-rose-400 font-bold select-none shrink-0">-</div>
                            <div className="px-2 py-0.5 whitespace-pre overflow-x-auto flex-1 font-mono">{line}</div>
                          </div>
                        ))}
                      </div>
                      {/* Right Column: Modified */}
                      <div className="bg-slate-950/60 divide-y divide-slate-900/40">
                        <div className="bg-slate-900/90 px-3 py-1 font-semibold text-slate-400 text-sm uppercase tracking-wider border-b border-slate-800">
                          Modified
                        </div>
                        {chunk.modifiedLines?.map((line, idx) => (
                          <div key={idx} className="flex items-stretch bg-emerald-950/30 text-emerald-300">
                            <div className="w-10 px-1 py-0.5 text-right text-slate-600 bg-slate-950/80 border-r border-slate-800/40 text-sm select-none shrink-0">
                              {chunk.startLineModified + idx}
                            </div>
                            <div className="w-5 py-0.5 text-center text-emerald-400 font-bold select-none shrink-0">+</div>
                            <div className="px-2 py-0.5 whitespace-pre overflow-x-auto flex-1 font-mono">{line}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            /* Fallback Raw Unified Patch Renderer */
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
              <pre className="text-emerald-400 whitespace-pre-wrap font-mono text-sm">
                {currentFile.patch || currentFile.modified || (currentFile as any).modifiedContent}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between shrink-0">
          <div className="text-sm text-slate-400">
            <span className="font-semibold text-white">{approvedChunkIds.size}</span> chunk{approvedChunkIds.size !== 1 ? 's' : ''} selected
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleReject}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              data-testid="cancel-writeback-btn"
            >
              {t.cancel}
            </button>
            <button
              onClick={handleApprove}
              disabled={approvedChunkIds.size === 0}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                approvedChunkIds.size > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-md'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
              data-testid="confirm-writeback-btn"
            >
              <Check size={14} />
              <span>{t.approveWriteBack}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
