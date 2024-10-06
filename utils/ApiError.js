class ApiError extends Error {
  constructor(
    statusCode, // HTTP status code
    message = "something went wrong", // Error message
    errors = [], // Specific errors
    stack = "" // Stack trace
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    // Capture stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError }; // Export the class
