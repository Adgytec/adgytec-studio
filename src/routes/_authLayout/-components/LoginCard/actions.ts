import type { SendLoginCode } from "./types";
import { signIn } from "aws-amplify/auth";

export const sendLoginCode: SendLoginCode = async (email) => {
  try {
    await signIn({
      username: email,
      options: {
        authFlowType: "USER_AUTH",
        preferredChallenge: "EMAIL_OTP",
      },
    });
    return true;
  } catch (err) {
    console.error("error occured during login: ", err);
    return false;
  }
};
