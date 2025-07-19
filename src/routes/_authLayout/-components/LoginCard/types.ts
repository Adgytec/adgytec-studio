import type { Dispatch, SetStateAction } from "react";
import * as z from "zod";

export interface LoginProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  goToConfirmLogin: () => void;
}

export interface ConfirmLoginProps {
  email: string;
  goToLogin: () => void;
}

export const LoginSchema = z.object({
  email: z.email().trim(),
});

export const ConfirmLoginSchema = z.object({
  code: z.coerce
    .number("Invalid code provided.")
    .positive("Invalid code provided.")
    .refine((code) => `${code}`.length === 6, "Code should be of six digits"),
});

export type ConfirmLoginValues = z.infer<typeof ConfirmLoginSchema>;
export type LoginValues = z.infer<typeof LoginSchema>;
