import type {
  ConfirmLogin,
  GetUserSession,
  IsAuthenticated,
  IsInManagement,
  IsNotAuthenticated,
  ListenToAuthEvents,
  RefreshUserSession,
  SendLoginCode,
} from "./types";
import {
  cognitoconfirmLogin,
  cognitoGetUserSession,
  cognitoHandleAuthEvents,
  cognitoIsInManagement,
  cognitosendLoginCode,
} from "./cognito";

export const sendLoginCode: SendLoginCode = async (email) => {
  return cognitosendLoginCode(email);
};

export const confirmLogin: ConfirmLogin = async (code) => {
  return cognitoconfirmLogin(code);
};

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

export const listenToAuthEvents: ListenToAuthEvents = (cb) => {
  return cognitoHandleAuthEvents(cb);
};
