"use strict";

const status = {
  OK: 200,
  CREATED: 201,
};

const ReasonStatus = {
  OK: "OK",
  CREATED: "Created",
};

class SuccessResponse {
  constructor(
    message,
    statusCode = status.OK,
    reasonStatus = ReasonStatus.OK,
    metadata = null
  ) {
    this.message = !message ? reasonStatus : message;
    this.statusCode = statusCode;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    return res.status(this.statusCode).json(this);
  }
}

class OK extends SuccessResponse {
  constructor(
    message,
    statusCode = status.OK,
    reasonStatus = ReasonStatus.OK,
    metadata = null
  ) {
    super(message, statusCode, reasonStatus, metadata);
  }
}

class Created extends SuccessResponse {
  constructor(
    message,
    statusCode = status.CREATED,
    reasonStatus = ReasonStatus.CREATED,
    metadata = null
  ) {
    super(message, statusCode, reasonStatus, metadata);
  }
}

module.exports = {
  OK,
  Created,
};
