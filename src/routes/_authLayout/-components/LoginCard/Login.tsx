import styles from "./login-card.module.css";
import {
  FilledButton,
  Input,
  type SubmitHandler,
  ButtonState,
  ButtonChild,
} from "@adgytec/adgytec-web-ui-components";
import { type LoginValues, LoginSchema, type LoginProps } from "./types";
import { Form } from "@adgytec/adgytec-web-ui-components";
import { sendLoginCode } from "./actions";
import { useState } from "react";

export const Login = ({ setEmail, goToConfirmLogin, email }: LoginProps) => {
  const [loginButtonState, setLoginButtonState] = useState<ButtonState>(
    ButtonState.enabled,
  );

  const handleLogin: SubmitHandler<LoginValues> = async (
    values: LoginValues,
    _,
  ) => {
    setLoginButtonState(ButtonState.pending);
    setEmail(values.email);
    try {
      await sendLoginCode(values.email);
      goToConfirmLogin();

      setLoginButtonState(ButtonState.completed);
    } catch (err) {
      setLoginButtonState(ButtonState.error);

      // handle error here parseError and show toast
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
    </Form>
  );
};
