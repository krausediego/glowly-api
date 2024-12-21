import * as env from 'env-var';

export default {
  host: env.get('SMTP_HOST').required().asString(),
  port: env.get('SMTP_PORT').required().asInt(),
  user: env.get('SMTP_USER').required().asString(),
  pass: env.get('SMTP_PASS').required().asString(),
} as const;
