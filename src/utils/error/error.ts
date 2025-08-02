import { AuthError } from "@/custom/Error/AuthError";
import { ErrorCode, type AppError } from "./types";
import { ApiError } from "@/custom/Error/ApiError";

export const parseError = (error: any): AppError => {
  // Check for network-level errors. Chatgpt copied TypeError
  if (
    error instanceof TypeError &&
    (error.message === "Failed to fetch" ||
      error.message === "NetworkError when attempting to fetch resource." ||
      error.message === "Load failed" || // Safari
      error.message.includes("NetworkError") ||
      error.message.includes("fetch"))
  ) {
    return {
      errorCode: ErrorCode.NETWORK,
      message: "Check your network connection or try again later.",
    };
  }

  // handle auth error
  if (error instanceof AuthError) {
    if (error.fieldError) {
      return {
        errorCode: ErrorCode.FORM_FIELD,
        fieldErrors: error.message,
      };
    }

    return {
      errorCode: ErrorCode.USER_ACTION,
      message: error.message,
    };
  }

  if (error instanceof ApiError) {
    // server error
    if (error.response.status >= 500) {
      return {
        errorCode: ErrorCode.SERVER,
        message:
          error.data.message ??
          "Internal server error. Please try again later.",
      };
    }

    switch (error.response.status) {
      case 422:
        return {
          errorCode: ErrorCode.FORM_FIELD,
          fieldErrors: error.data.fieldErrors ?? {},
        };

      case 400:
        return {
          errorCode: ErrorCode.USER_ACTION,
          message:
            error.data?.message ??
            "Something went wrong while processing your request.",
        };

      case 401:
        return {
          errorCode: ErrorCode.AUTHENTICATION,
          message: error.data?.message ?? "User login required.",
        };

      case 403:
        return {
          errorCode: ErrorCode.AUTHORIZATION,
          message:
            error.data?.message ??
            "You don't have necessary permission to perform the requested action.",
        };

      case 404:
        return {
          errorCode: ErrorCode.NOT_FOUND,
          message: error.data?.message ?? "Requested action not found.",
        };

      case 405:
        return {
          errorCode: ErrorCode.METHOD_NOT_ALLOWED,
          message:
            error.data?.message ?? "Requested action method not allowed.",
        };

      case 429:
        return {
          errorCode: ErrorCode.TOO_MANY_REQUESTS,
          retryAfter:
            Number(error.response.headers.get("retry-after")) * 1000 || 1000,
          message: "Too many requests. Try again later.",
        };

      case 413:
        return {
          errorCode: ErrorCode.CONTENT_TOO_LARGE,
          message: error.data?.message ?? "Request contnet too large.",
        };

      default:
        return {
          errorCode: ErrorCode.UNKNOWN,
          message: error.data?.message ?? `Unexpected error occurred.`,
        };
    }
  }

  return {
    errorCode: ErrorCode.UNKNOWN,
    message:
      "Unknown error occured. Please refresh this page or try again later.",
  };
};
