import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/infra/drizzle/schemas/index.ts',
  out: './drizzle',
  dbCredentials: {
    url: 'postgres://admin:admin@localhost:5432/barber',
  },
});
