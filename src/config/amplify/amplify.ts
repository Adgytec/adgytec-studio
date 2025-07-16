import { Amplify } from "aws-amplify";
import { getEnvVar } from "@/utils/env/env";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: getEnvVar("COGNITO_USER_POOL_ID"),
      userPoolClientId: getEnvVar("COGNITO_USER_POOL_CLIENT_ID"),
      identityPoolId: getEnvVar("COGNITO_IDENTITY_POOL_ID"),
    },
  },
  Storage: {
    S3: {
      buckets: {
        "studio-bucket": {
          bucketName: getEnvVar("S3_STUDIO_BUCKET"),
          region: getEnvVar("S3_STUDIO_BUCKET_REGION"),
        },
        "drive-storage-bucket": {
          bucketName: getEnvVar("S3_DRIVE_STORAGE_BUCKET"),
          region: getEnvVar("S3_DRIVE_STORAGE_BUCKET_REGION"),
        },
      },
    },
  },
});
