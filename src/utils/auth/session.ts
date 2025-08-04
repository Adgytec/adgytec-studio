import type {
  GetUserSession,
  IsAuthenticated,
  IsInManagement,
  IsNotAuthenticated,
  RefreshUserSession,
} from "./types";
import { cognitoGetUserSession, cognitoIsInManagement } from "./cognito";

const getUserSession: GetUserSession = async (options) => {
  return cognitoGetUserSession(options);
};

export const isAuthenticated: IsAuthenticated = async () => {
  return (await getUserSession()) ? true : false;
};

export const isNotAuthenticated: IsNotAuthenticated = async () => {
  return !(await isAuthenticated());
};

export const isInManagement: IsInManagement = async () => {
  return await cognitoIsInManagement();
};

export const refreshUserSession: RefreshUserSession = async () => {
  return await getUserSession({ refresh: true });
};
