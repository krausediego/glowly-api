import * as env from 'env-var';

export default {
  secretAuth: env.get('JWT_SECRET_AUTH').required().asString(),
  secretRecovery: env.get('JWT_SECRET_RECOVERY').required().asString(),
} as const;
