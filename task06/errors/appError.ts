import { HttpStatusCode } from './statusCode';

export class AppError extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly isOperational: boolean;

  constructor(
    statusCode: HttpStatusCode,
    message: string,
    isOperational: boolean
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}
