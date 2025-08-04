import {
  CognitoGroupKey,
  CognitoManagementGroup,
  type GetUserSession,
  type IsInManagement,
} from "./types";
import { fetchAuthSession } from "aws-amplify/auth";

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
