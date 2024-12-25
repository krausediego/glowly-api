import * as env from 'env-var';

export default {
  accessKeyId: env.get('AWS_S3_ACCESS_KEY_ID').required().asString(),
  secretAccessKey: env.get('AWS_S3_SECRET_ACCESS_KEY').required().asString(),
} as const;
