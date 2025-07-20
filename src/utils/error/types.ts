export enum ErrorCode {
  SERVER = "server-error",
  NETWORK = "network-error",
  TOO_MANY_REQUESTS = "too-many-requests-error",
  AUTHENTICATION = "authentication-error",
  AUTHORIZATION = "authorization-error",
  NOT_FOUND = "not-found-error",
  METHOD_NOT_ALLOWED = "method-not-allowed-error",
  FORM_FIELD = "form-field-error",
  FORM_ACTION = "form-action-error",
  UNKNOWN = "unknown-error",
}

type ServerError = {
  errorCode: ErrorCode.SERVER;
  message: string;
};

type NetworkError = {
  errorCode: ErrorCode.NETWORK;
  message: string;
};

type TooManyRequestsError = {
  errorCode: ErrorCode.TOO_MANY_REQUESTS;
  retryAfter?: number; // time in ms
};

type AuthenticationError = {
  errorCode: ErrorCode.AUTHENTICATION;
  message: string;
};

type AuthorizationError = {
  errorCode: ErrorCode.AUTHORIZATION;
  message: string;
};

type NotFoundError = {
  errorCode: ErrorCode.NOT_FOUND;
  message: string;
};

type MethodNotAllowedError = {
  errorCode: ErrorCode.METHOD_NOT_ALLOWED;
  message: string;
};

type FormFieldError = {
  errorCode: ErrorCode.FORM_FIELD;
  fieldErrors: Record<string, string | string[]>;
};

type FormActionError = {
  errorCode: ErrorCode.FORM_ACTION;
  message: string;
};

type UnknownError = {
  errorCode: ErrorCode.UNKNOWN;
  message: string;
};

export type AppError =
  | ServerError
  | NetworkError
  | TooManyRequestsError
  | AuthenticationError
  | AuthorizationError
  | NotFoundError
  | MethodNotAllowedError
  | FormFieldError
  | FormActionError
  | UnknownError;
