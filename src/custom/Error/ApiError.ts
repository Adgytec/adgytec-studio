export class ApiError extends Error {
  status: number;
  data: any;
  response: Response;

  constructor(httpStatus: number, response: Response, data: any) {
    super();

    this.name = "ApiError";
    this.status = httpStatus;
    this.data = data;
    this.response = response;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
