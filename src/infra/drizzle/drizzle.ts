import { drizzle as dizzleCreate } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import env from '@/main/config/environments/database';

import * as schema from './schemas';

const client = postgres(env.database);

export const drizzle = dizzleCreate(client, { schema });
