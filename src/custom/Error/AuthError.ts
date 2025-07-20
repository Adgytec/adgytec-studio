export class AuthError extends Error {
  message: string;

  constructor(message: string) {
    super();

    this.name = "AuthError";
    this.message = message;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthError);
    }
  }
}
