import { relations } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

import {
  establishmentReviews,
  establishmentSpecialists,
  profiles,
  recoveryCodes,
  userAddresses,
  userFavorites,
} from '.';

export const users = pgTable('users', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  status: boolean('status').notNull().default(true),
  customer: boolean('customer').notNull().default(true),
  profileId: text('profile_id')
    .references(() => profiles.id, { onDelete: 'set null' })
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.profileId],
    references: [profiles.id],
  }),
  userAddress: one(userAddresses),
  establishmentSpecialist: many(establishmentSpecialists),
  recoveryCode: many(recoveryCodes),
  review: many(establishmentReviews),
  favorite: many(userFavorites),
}));
