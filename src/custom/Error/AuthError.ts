export class AuthError extends Error {
  fieldError: boolean;
  message: any;

  constructor(data: any, fieldError = false) {
    super();

    this.name = "AuthError";
    this.fieldError = fieldError;
    this.message = data;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthError);
    }
  }
}
