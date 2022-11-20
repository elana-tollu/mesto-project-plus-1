const ERR_NOT_FOUND = 404;
const ERR_BAD_REQUEST = 400;
const ERR_INTERNAL_SERVER_ERROR = 500;

export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function notFoundError(message: string) {
  return new AppError(ERR_NOT_FOUND, message);
}

export function badRequestError(message: string) {
  return new AppError(ERR_BAD_REQUEST, message);
}

export function internalServerError(message: string) {
  return new AppError(ERR_INTERNAL_SERVER_ERROR, message);
}
