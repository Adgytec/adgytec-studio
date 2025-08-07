import { Amplify } from "aws-amplify";
import { getEnvVar } from "@/utils/env/env";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: getEnvVar("VITE_COGNITO_USER_POOL_ID"),
      userPoolClientId: getEnvVar("VITE_COGNITO_USER_POOL_CLIENT_ID"),
    },
  },
});
