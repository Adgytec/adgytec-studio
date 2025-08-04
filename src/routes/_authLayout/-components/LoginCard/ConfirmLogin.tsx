import styles from "./login-card.module.css";
import {
  ButtonShape,
  ColorTheme,
  FilledButton,
  Input,
  TextButton,
  type SubmitHandler,
  ButtonState,
  ButtonChild,
  Error,
} from "@adgytec/adgytec-web-ui-components";
import {
  ConfirmLoginSchema,
  type ConfirmLoginProps,
  type ConfirmLoginValues,
  type ResendButtonProps,
} from "./types";
import { Form } from "@adgytec/adgytec-web-ui-components";
import { useEffect, useState } from "react";
import { useCountdown } from "usehooks-ts";
import { parseError } from "@/utils/error/error";
import { ErrorCode } from "@/utils/error/types";
import { confirmLogin, sendLoginCode } from "@/utils/auth/auth";
import { ResendCodeTimeLimit } from "@/utils/auth/types";

const ResendButton = ({ email, isDisabled = false }: ResendButtonProps) => {
  const [resendButtonState, setResendButtonState] = useState<ButtonState>(
    ButtonState.enabled,
  );

  const [remainingTime, { startCountdown, resetCountdown }] = useCountdown({
    countStart: ResendCodeTimeLimit,
  });

  useEffect(() => {
    startCountdown();

    return resetCountdown;
  }, []);

  const handleResendCode = async () => {
    setResendButtonState(ButtonState.pending);

    try {
      await sendLoginCode(email);

      setResendButtonState(ButtonState.completed);
    } catch (err) {
      setResendButtonState(ButtonState.error);
    } finally {
      resetCountdown();
      startCountdown();
    }
  };

  return (
    <div className={styles["login-code-resend"]}>
      <p>
        <TextButton
          isDisabled={
            remainingTime !== 0 ||
            isDisabled ||
            resendButtonState === ButtonState.disabled
          }
          isPending={resendButtonState === ButtonState.pending}
          shape={ButtonShape.shrink}
          theme={ColorTheme.success}
          onPress={handleResendCode}
        >
          <ButtonChild
            buttonState={resendButtonState}
            value={{
              enabled: "Resend code",
              pending: "Resending",
              error: "Try resending again",
            }}
          />
        </TextButton>

        {remainingTime !== 0 && ` in ${remainingTime} seconds.`}
      </p>
    </div>
  );
};

export const ConfirmLogin = ({ email, goToLogin }: ConfirmLoginProps) => {
  const [formError, setFormError] = useState<string | null>(null);
  const [loginButtonState, setLoginButtonState] = useState<ButtonState>(
    ButtonState.enabled,
  );

  const handleConfirmLogin: SubmitHandler<ConfirmLoginValues> = async (
    values,
    _,
  ) => {
    setLoginButtonState(ButtonState.pending);
    setFormError(null);

    try {
      await confirmLogin(values.code);

      setLoginButtonState(ButtonState.completed);
    } catch (err) {
      setLoginButtonState(ButtonState.error);

      // handle error here parseError and show toast
      const errVal = parseError(err);
      if (errVal.errorCode === ErrorCode.FORM_FIELD) {
        return errVal.fieldErrors as Partial<
          Record<keyof ConfirmLoginValues, string | string[]>
        >;
      }

      setFormError(errVal.message);
    }
  };

  return (
    <>
      <Form onSubmit={handleConfirmLogin} schema={ConfirmLoginSchema}>
        <Input
          label="Email"
          textFieldProps={{
            type: "email",
            autoComplete: "email",
            isRequired: true,
            inputMode: "email",
            name: "email",
            isDisabled: true,
            value: email,
          }}
          inputProps={{
            placeholder: "sutdio@adgytec.in",
          }}
        />

        <Input
          label="Code"
          textFieldProps={{
            autoFocus: true,
            type: "text",
            isRequired: true,
            inputMode: "numeric",
            name: "code",
          }}
          inputProps={{
            placeholder: "Code",
          }}
        />

        <ResendButton
          email={email}
          isDisabled={loginButtonState === ButtonState.pending}
        />

        <div className={styles["login-submit"]}>
          <FilledButton
            type="submit"
            isPending={loginButtonState === ButtonState.pending}
            isDisabled={loginButtonState === ButtonState.disabled}
          >
            <ButtonChild
              buttonState={loginButtonState}
              value={{
                enabled: "Login",
                pending: "Logging in",
                completed: "Done",
              }}
            />
          </FilledButton>
        </div>

        {formError && <Error>{formError}</Error>}
      </Form>

      <div className={styles["confirm-login-actions"]}>
        <TextButton
          onPress={goToLogin}
          shape={ButtonShape.shrink}
          theme={ColorTheme.inverseSurface}
          isDisabled={loginButtonState === ButtonState.pending}
        >
          Back
        </TextButton>
      </div>
    </>
  );
};
