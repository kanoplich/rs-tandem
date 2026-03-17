import { XCircle } from 'lucide-react';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 sm:p-8">
          <XCircle className="w-12 h-12 sm:w-16 sm:h-16 text-destructive mb-4" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-center">
            Упс! Что-то пошло не так
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted text-center max-w-md">
            Попробуйте обновить страницу или вернуться позже.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
