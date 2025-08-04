interface JwtPayload {
  [key: string]: any;
}

export interface JWT {
  payload: JwtPayload;
  toString(): string;
}

export interface UserSession {
  userId: string;
  accessToken?: JWT;
  idToken?: JWT;
}

export interface GetUserSessionOptions {
  refresh: boolean;
}

export type SendLoginCode = (email: string) => Promise<void>;

export type ConfirmLogin = (code: string) => Promise<void>;

export type IsAuthenticated = () => Promise<boolean>;

export type IsNotAuthenticated = () => Promise<boolean>;

export type IsInManagement = () => Promise<boolean>;

export type GetUserSession = (
  options?: GetUserSessionOptions,
) => Promise<UserSession | null>;

export type RefreshUserSession = () => Promise<UserSession | null>;

export const CognitoGroupKey = "cognito:groups";
export const CognitoManagementGroup = "management";
export const ResendCodeTimeLimit = 45; // in seconds
