export class ApiError extends Error {
  status: number;
  data: any;

  constructor(httpStatus: number, data: any) {
    super();

    this.name = "ApiError";
    this.status = httpStatus;
    this.data = data;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
