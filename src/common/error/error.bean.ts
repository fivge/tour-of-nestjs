import { HttpException, HttpStatus } from "@nestjs/common";

import { BusinessStatus } from "../business";

export interface BusinessStatusErrorInfo {
  code: BusinessStatus;
  message?: string;
  data?: any;
}

export class ErrorBean extends HttpException {
  constructor(
    httpStatus: HttpStatus,
    businessStatusErrorInfo: BusinessStatusErrorInfo,
    logger?: any,
  ) {
    super(businessStatusErrorInfo, httpStatus, {
      cause: logger,
      // description: businessStatusErrorInfo.message,
    });
  }
}
