import { Request, Response, NextFunction } from 'express';

/**
 * Custom HTTP Exception class for RESTful API error handling
 * Allows precise status code control (400, 404, 500, etc.)
 */
export class HttpException extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Legacy alias for backward compatibility
 * @deprecated Use HttpException instead
 */
export class AppError extends HttpException {
  constructor(message: string, statusCode: number) {
    super(statusCode, message);
  }
}

/**
 * Error handling middleware
 * Distinguishes between client errors (400), not found (404), and server errors (500)
 */
export const errorHandler = (
  err: Error | HttpException,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof HttpException) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  console.error('[ERROR]', {
    statusCode,
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.url
  });
};

/**
 * Async handler wrapper to catch errors in async route handlers
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

