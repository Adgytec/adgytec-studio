import styles from "./login-card.module.css";
import {
  ButtonShape,
  ColorTheme,
  FilledButton,
  Input,
  TextButton,
} from "@adgytec/adgytec-web-ui-components";
import {
  ConfirmLoginSchema,
  type LoginValues,
  LoginSchema,
  type ConfirmLoginProps,
  type ConfirmLoginValues,
  type LoginProps,
} from "./types";
import { Form, type FormReset } from "@adgytec/adgytec-web-ui-components";
import { useEffect, useState } from "react";
import { useBoolean, useCountdown } from "usehooks-ts";
import { sendLoginCode } from "./actions";

const Login = ({ setEmail, goToConfirmLogin, email }: LoginProps) => {
  const handleLogin = async (
    values: LoginValues,
    _: HTMLFormElement["reset"],
  ) => {
    setEmail(values.email);
    await sendLoginCode(values.email);
    goToConfirmLogin();
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
          placeholder: "sutdio@adgytec.in",
        }}
      />

      <div className={styles["login-submit"]}>
        <FilledButton type="submit">Continue</FilledButton>
      </div>
    </Form>
  );
};

const ConfirmLogin = ({ email, goToLogin }: ConfirmLoginProps) => {
  const [remainingTime, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 45,
  });

  useEffect(() => {
    startCountdown();

    return resetCountdown;
  }, []);

  const handleConfirmLogin = (values: ConfirmLoginValues, reset: FormReset) => {
    console.log(values);
    reset();
  };

  const handleResendCode = () => {
    resetCountdown();
    startCountdown();
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

        <div className={styles["login-code-resend"]}>
          <p>
            <TextButton
              isDisabled={remainingTime !== 0}
              shape={ButtonShape.shrink}
              theme={ColorTheme.success}
              onPress={handleResendCode}
            >
              Resend Code
            </TextButton>

            {remainingTime !== 0 && ` in ${remainingTime} seconds.`}
          </p>
        </div>

        <div className={styles["login-submit"]}>
          <FilledButton type="submit">Login</FilledButton>
        </div>
      </Form>

      <div className={styles["confirm-login-actions"]}>
        <TextButton
          onPress={goToLogin}
          shape={ButtonShape.shrink}
          theme={ColorTheme.inverseSurface}
        >
          Back
        </TextButton>
      </div>
    </>
  );
};

export const LoginCard = () => {
  const [email, setEmail] = useState("");
  const {
    value: isLogin,
    setTrue: goToLogin,
    setFalse: goToConfirmLogin,
  } = useBoolean(false);

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-card"]}>
        <h1 data-heading="true">Studio Login</h1>

        {isLogin ? (
          <Login
            setEmail={setEmail}
            goToConfirmLogin={goToConfirmLogin}
            email={email}
          />
        ) : (
          <ConfirmLogin email={email} goToLogin={goToLogin} />
        )}
      </div>
    </div>
  );
};
