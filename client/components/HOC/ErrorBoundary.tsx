import { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p className="text-center p-5">Loading failed! Please reload.</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
