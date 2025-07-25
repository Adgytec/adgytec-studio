import { AuthError } from "@/custom/Error/AuthError";
import type { ConfirmLogin, SendLoginCode } from "./types";
import { confirmSignIn, signIn } from "aws-amplify/auth";

export const sendLoginCode: SendLoginCode = async (email) => {
  try {
    const { nextStep } = await signIn({
      username: email,
      options: {
        authFlowType: "USER_AUTH",
        preferredChallenge: "EMAIL_OTP",
      },
    });

    if (nextStep.signInStep !== "CONFIRM_SIGN_IN_WITH_EMAIL_CODE") {
      throw new Error();
    }
  } catch (err) {
    // console.error("error occured during login: ", err);
    if (err instanceof Error && err.name === "LimitExceededException") {
      throw new AuthError("Code send limit reached. Please try again later.");
    }

    throw new AuthError(
      "Some went wrong during signin attempt. Please try again later.",
    );
  }
};

export const confirmLogin: ConfirmLogin = async (code) => {
  try {
    const { nextStep } = await confirmSignIn({
      challengeResponse: code,
    });

    if (nextStep.signInStep !== "DONE") {
      throw new Error();
    }
  } catch (err) {
    // console.error("something went wrong: ", err);
    if (err instanceof Error && err.name === "CodeMismatchException") {
      throw new AuthError(
        {
          code: "Invalid code provided.",
        },
        true,
      );
    }

    throw new AuthError("Something went wrong. Please try again later.");
  }
};
