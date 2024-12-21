import { relations } from 'drizzle-orm';
import {
  doublePrecision,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

import { users } from '.';

export const userAddresses = pgTable('user_addresses', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  street: text('street').notNull(),
  neighborhood: text('neighborhood').notNull(),
  state: text('state').notNull(),
  city: text('city').notNull(),
  number: integer('number'),
  cep: text('cep'),
  lat: doublePrecision('lat').notNull(),
  long: doublePrecision('long').notNull(),
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'set null' })
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const userAddressesRelations = relations(userAddresses, ({ one }) => ({
  user: one(users, {
    fields: [userAddresses.userId],
    references: [users.id],
  }),
}));
