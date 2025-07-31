export interface ApiErrorResponse {
  errorCode: string;
  message?: string;
  fieldErrors?: Record<string, string | string[]>;
}

export class ApiError extends Error {
  status: number;
  data: ApiErrorResponse;
  response: Response;

  constructor(httpStatus: number, response: Response, data: ApiErrorResponse) {
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
