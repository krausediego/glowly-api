import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

import { users } from '.';

export const profiles = pgTable('profiles', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  avatarURL: text('avatar_url'),
  name: text('name').notNull(),
  birthDate: timestamp('birth_date', { withTimezone: true }),
  phone: text('phone').notNull(),
  gender: text('gender'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users),
}));
