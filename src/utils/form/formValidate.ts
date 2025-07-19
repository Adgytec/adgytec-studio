import { z } from "zod";

import type { ValidateAndGetFormValues } from "./types";

export const validateAndGetFormValues: ValidateAndGetFormValues = (
  formElement,
  schema,
) => {
  const valueObject = Object.fromEntries(new FormData(formElement));
  const result = schema.safeParse(valueObject);
  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }

  return {
    success: false,
    errors: z.flattenError(result.error).fieldErrors,
  };
};
