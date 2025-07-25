import { fetchAuthSession } from "aws-amplify/auth";
import type { IsAuthenticated, IsNotAuthenticated } from "./types";

const getUserSession = async () => {
  try {
    const session = await fetchAuthSession();
    return session.userSub ? session : null;
  } catch (err) {
    // console.error("Error getting user session: ", err);
    return null;
  }
};

export const isAuthenticated: IsAuthenticated = async () => {
  return (await getUserSession()) ? true : false;
};

export const isNotAuthenticated: IsNotAuthenticated = async () => {
  return !(await isAuthenticated());
};
