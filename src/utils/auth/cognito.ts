import {
  CognitoGroupKey,
  CognitoManagementGroup,
  type GetUserSession,
  type IsInManagement,
  type SendLoginCode,
  type ConfirmLogin,
} from "./types";
import { fetchAuthSession, confirmSignIn, signIn } from "aws-amplify/auth";
import { AuthError } from "@/custom/Error/AuthError";

export const cognitoGetUserSession: GetUserSession = async (options) => {
  try {
    const session = await fetchAuthSession({
      forceRefresh: options?.refresh ?? false,
    });

    if (!session.userSub) {
      throw new Error("no user session found");
    }

    return {
      userId: session.userSub,
      accessToken: session.tokens?.accessToken,
      idToken: session.tokens?.idToken,
    };
  } catch (err) {
    // console.error("Error getting user session: ", err);
    return null;
  }
};

export const cognitoIsInManagement: IsInManagement = async () => {
  const session = await cognitoGetUserSession();
  if (!session) return false;

  const group = session.idToken?.payload[CognitoGroupKey];
  if (!group || !Array.isArray(group)) {
    return false;
  }

  if (!group.every((item) => typeof item === "string")) {
    return false;
  }

  return group.includes(CognitoManagementGroup);
};

export const cognitosendLoginCode: SendLoginCode = async (email) => {
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

export const cognitoconfirmLogin: ConfirmLogin = async (code) => {
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
