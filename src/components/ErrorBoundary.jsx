import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-8">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-lg text-center">
            <h1 className="text-2xl font-bold mb-4 text-red-600">Something went wrong.</h1>
            <p className="mb-4">We apologize for the inconvenience. Please try refreshing the page.</p>
            <button 
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Refresh Page
            </button>
            <details className="mt-4 text-left text-sm text-gray-500 bg-gray-50 p-2 rounded overflow-auto">
                <summary className="cursor-pointer mb-2">Error Details</summary>
                <pre>{this.state.error && this.state.error.toString()}</pre>
            </details>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
