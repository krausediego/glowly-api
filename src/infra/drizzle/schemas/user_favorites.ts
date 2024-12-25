import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

import { establishments, users } from '.';

export const userFavorites = pgTable('user_favorites', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'set null' })
    .notNull(),
  establishmentId: text('establishment_id')
    .references(() => establishments.id, { onDelete: 'set null' })
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const userFavoritesRelations = relations(userFavorites, ({ one }) => ({
  user: one(users, {
    fields: [userFavorites.userId],
    references: [users.id],
  }),
  establishment: one(establishments, {
    fields: [userFavorites.establishmentId],
    references: [establishments.id],
  }),
}));
