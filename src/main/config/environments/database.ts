import * as env from 'env-var';

export default {
  database: env.get('DATABASE_URL').required().asString(),
} as const;
