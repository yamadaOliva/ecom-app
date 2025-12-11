"use strict";

const StatusCode = {
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const ReasonPhrase = {
  NO_CONTENT: "No Content",
  BAD_REQUEST: "Bad Request",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Not Found",
  CONFLICT: "Conflict",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
};

class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode;
    console.log("message", message, statusCode);
  }
}

class SuccessResponse {
  constructor(data = 200, statusCode) {
    this.data = data;
    this.statusCode = statusCode;
  }
}

class ConflictResponse extends ErrorResponse {
  constructor(
    message = ReasonPhrase.CONFLICT,
    statusCode = StatusCode.CONFLICT
  ) {
    super(message, statusCode);
  }
}

class NotFoundResponse extends ErrorResponse {
  constructor(
    message = ReasonPhrase.NOT_FOUND,
    statusCode = StatusCode.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}

class ForbiddenResponse extends ErrorResponse {
  constructor(
    message = ReasonPhrase.FORBIDDEN,
    statusCode = StatusCode.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}

class UnauthorizedResponse extends ErrorResponse {
  constructor(
    message = ReasonPhrase.UNAUTHORIZED,
    statusCode = StatusCode.UNAUTHORIZED
  ) {
    super(message, statusCode);
  }
}

class BadRequestResponse extends ErrorResponse {
  constructor(
    message = ReasonPhrase.BAD_REQUEST,
    statusCode = StatusCode.BAD_REQUEST
  ) {
    super(message, statusCode);
  }
}

class InternalServerErrorResponse extends ErrorResponse {
  constructor(
    message = ReasonPhrase.INTERNAL_SERVER_ERROR,
    statusCode = StatusCode.INTERNAL_SERVER_ERROR
  ) {
    super(message, statusCode);
  }
}

module.exports = {
  ErrorResponse,
  SuccessResponse,
  ConflictResponse,
  NotFoundResponse,
  ForbiddenResponse,
  UnauthorizedResponse,
  BadRequestResponse,
  InternalServerErrorResponse,
};
