import { relations } from 'drizzle-orm';
import {
  doublePrecision,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

import { establishments } from '.';

export const establishmentAddresses = pgTable('establishment_addresses', {
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
  establishmentId: text('establishment_id')
    .references(() => establishments.id, { onDelete: 'set null' })
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const establishmentAddressesRelations = relations(
  establishmentAddresses,
  ({ one }) => ({
    establishment: one(establishments, {
      fields: [establishmentAddresses.establishmentId],
      references: [establishments.id],
    }),
  }),
);
