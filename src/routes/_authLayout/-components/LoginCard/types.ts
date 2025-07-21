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

export interface ResendButtonProps {
  email: string;
  isDisabled?: boolean;
}

export const LoginSchema = z.object({
  email: z.email().trim(),
});

export const ConfirmLoginSchema = z.object({
  code: z.coerce
    .number("Invalid code provided.")
    .positive("Invalid code provided.")
    .refine(
      (code) => `${code}`.length >= 6 && `${code}`.length <= 8,
      "Code should be of between 6-8 digits",
    )
    .transform((code) => `${code}`),
});

export type ConfirmLoginValues = z.infer<typeof ConfirmLoginSchema>;
export type LoginValues = z.infer<typeof LoginSchema>;

export type SendLoginCode = (email: string) => Promise<void>;
export type ConfirmLogin = (code: string) => Promise<void>;
