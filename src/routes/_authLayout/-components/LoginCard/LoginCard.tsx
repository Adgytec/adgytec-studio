import styles from "./login-card.module.css";
import { useState } from "react";
import { useBoolean } from "usehooks-ts";
import { Login } from "./Login";
import { ConfirmLogin } from "./ConfirmLogin";
import { VisualSettings } from "@/components/VisualSettings/VisualSettings";

export const LoginCard = () => {
  const [email, setEmail] = useState("");
  const {
    value: isLogin,
    setTrue: goToLogin,
    setFalse: goToConfirmLogin,
  } = useBoolean(true);

  return (
    <div className={styles["login-container"]}>
      <div className={styles["visual-settings"]}>
        <VisualSettings />
      </div>

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
