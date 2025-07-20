import { AuthError } from "@/custom/Error/AuthError";
import { ErrorCode, type AppError } from "./types";

export const parseError = (error: any): AppError => {
  if (error instanceof AuthError) {
    if (error.fieldError) {
      return {
        errorCode: ErrorCode.FORM_FIELD,
        fieldErrors: error.message,
      };
    }
  }

  return {
    errorCode: ErrorCode.UNKNOWN,
    message: "Unknown error occured.",
  };
};
