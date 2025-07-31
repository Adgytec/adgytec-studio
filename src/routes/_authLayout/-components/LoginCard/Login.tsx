import styles from "./login-card.module.css";
import {
  FilledButton,
  Input,
  type SubmitHandler,
  ButtonState,
  ButtonChild,
  Error,
} from "@adgytec/adgytec-web-ui-components";
import { type LoginValues, LoginSchema, type LoginProps } from "./types";
import { Form } from "@adgytec/adgytec-web-ui-components";
import { sendLoginCode } from "./actions";
import { useState } from "react";
import { parseError } from "@/utils/error/error";
import { ErrorCode } from "@/utils/error/types";

export const Login = ({ setEmail, goToConfirmLogin, email }: LoginProps) => {
  const [formError, setFormError] = useState<string | null>(null);
  const [loginButtonState, setLoginButtonState] = useState<ButtonState>(
    ButtonState.enabled,
  );

  const handleLogin: SubmitHandler<LoginValues> = async (
    values: LoginValues,
    _,
  ) => {
    setLoginButtonState(ButtonState.pending);
    setEmail(values.email);
    setFormError(null);

    try {
      await sendLoginCode(values.email);
      goToConfirmLogin();

      setLoginButtonState(ButtonState.completed);
    } catch (err) {
      setLoginButtonState(ButtonState.error);

      const errValue = parseError(err);
      if (errValue.errorCode === ErrorCode.FORM_ACTION) {
        setFormError(errValue.message);
      }
    }
  };

  return (
    <Form onSubmit={handleLogin} schema={LoginSchema}>
      <Input
        label="Email"
        textFieldProps={{
          autoFocus: true,
          type: "email",
          autoComplete: "email",
          isRequired: true,
          inputMode: "email",
          name: "email",
          defaultValue: email,
        }}
        inputProps={{
          placeholder: "studio@adgytec.in",
        }}
      />

      <div className={styles["login-submit"]}>
        <FilledButton
          type="submit"
          isDisabled={loginButtonState === ButtonState.disabled}
          isPending={loginButtonState === ButtonState.pending}
        >
          <ButtonChild
            buttonState={loginButtonState}
            value={{
              enabled: "Continue",
              pending: "Sending Code",
              completed: "Sent",
            }}
          />
        </FilledButton>
      </div>

      {formError && <Error>{formError}</Error>}
    </Form>
  );
};
