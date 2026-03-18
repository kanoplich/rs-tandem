import { XCircle, RefreshCw } from 'lucide-react';
import React from 'react';

import { ERROR_BOUNDARY_TEXT } from './locales';

import { Button } from '@/shared';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
              <XCircle className="h-12 w-12 text-destructive" />
            </div>

            <h1 className="mb-3 text-3xl font-semibold tracking-tight text-foreground">
              {ERROR_BOUNDARY_TEXT.FALLBACK_TITLE}
            </h1>

            <p className="mb-2 text-muted-foreground text-[15px] leading-relaxed">
              {ERROR_BOUNDARY_TEXT.FALLBACK_MESSAGE}
            </p>

            <div className="mt-4 mb-6 rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-center font-mono text-sm text-destructive">
              {this.state.error?.message || ERROR_BOUNDARY_TEXT.UNKNOWN_ERROR}
            </div>

            <Button onClick={this.handleReload} size="lg" className="gap-2 px-8">
              <RefreshCw className="h-4 w-4" />
              {ERROR_BOUNDARY_TEXT.RELOAD_BUTTON}
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
