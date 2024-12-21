import { relations } from 'drizzle-orm';
import { boolean, pgTable, real, text, timestamp } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

import { establishments, users } from '.';

export const establishmentReviews = pgTable('establishment_reviews', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  rating: real('rating').notNull(),
  message: text('message'),
  anonymous: boolean('anonymous').default(false),
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'set null' })
    .notNull(),
  establishmentId: text('establishment_id')
    .references(() => establishments.id, { onDelete: 'set null' })
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const establishmentReviewsRelations = relations(
  establishmentReviews,
  ({ one }) => ({
    user: one(users, {
      fields: [establishmentReviews.userId],
      references: [users.id],
    }),
    establishment: one(establishments, {
      fields: [establishmentReviews.establishmentId],
      references: [establishments.id],
    }),
  }),
);
