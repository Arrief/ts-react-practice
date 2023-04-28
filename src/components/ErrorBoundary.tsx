/* componentDidCatch method is unique to Class Components, very good for handling API error, including 404s.

Can only catch errors in its children however, not within itself! So make it a wrapper component. Kinda like a big catch block!

See: reactjs.org/docs/error-boundaries.html 
*/
import { Component, ErrorInfo, ReactElement } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component<{ children: ReactElement }> {
  state = { hasError: false };

  // Static method working like a state updater, is a helper method to be called directly on the Class itself, not on Instances
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Lifecycle method
  componentDidCatch(error: Error, info: ErrorInfo) {
    // Works great in combination with Sentry and/or Track.js!
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to back to the home page.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
