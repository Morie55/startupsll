import "server-only";

import { S3Client } from "@aws-sdk/client-s3";
import type { AwsCredentialIdentity } from "@aws-sdk/types";
const credentials: AwsCredentialIdentity = {
  accessKeyId: process.env.T3_ACCESS_KEY_ID ?? "",
  secretAccessKey: process.env.T3_SECRET_ACCESS_KEY ?? "",
};

export const S3 = new S3Client({
  region: process.env.T3_REGION ?? "auto",
  endpoint: process.env.T3_ENDPOINT,
  forcePathStyle: false,
  credentials,
});

// export const S3 = new S3Client({
//   region: "auto",
//   endpoint: process.env.T3_ENDPOINT,
//   forcePathStyle: false,
//   credentials: {
//     accessKeyId: process.env.T3_ACCESS_KEY_ID,
//     secretAccessKey: process.env.T3_SECRET_ACCESS_KEY,
//   },
// });
