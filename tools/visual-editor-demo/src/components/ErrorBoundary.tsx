import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from './Hugeicons';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[VisualEditor UI ErrorBoundary]', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 text-sm flex flex-col items-center justify-center text-center space-y-2 select-none h-full">
          <AlertCircle size={24} className="text-amber-500 opacity-80" />
          <span className="font-semibold text-slate-200">{this.props.fallbackTitle || 'Component Error Recovered'}</span>
          <p className="text-sm text-slate-500 max-w-xs truncate">{this.state.error?.message || 'An unexpected rendering error occurred.'}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded border border-slate-700 transition"
          >
            Retry Render
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
