import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Unhandled UI error:', error, info);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[hsl(48,60%,98%)] p-6">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold text-slate-800 mb-3">Something went wrong</h1>
            <p className="text-slate-600 mb-6">Please refresh the page. If this continues, contact support.</p>
            <button onClick={() => window.location.reload()} className="px-5 py-3 rounded-xl bg-[hsl(210,70%,60%)] text-white">
              Refresh
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
