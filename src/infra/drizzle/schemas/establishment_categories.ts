import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

import { establishments } from '.';

export const establishmentCategories = pgTable('establishment_categories', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  name: text('name').notNull(),
  establishmentId: text('establishment_id')
    .references(() => establishments.id, { onDelete: 'set null' })
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const establishmentCategoriesRelations = relations(
  establishmentCategories,
  ({ one }) => ({
    establishment: one(establishments, {
      fields: [establishmentCategories.establishmentId],
      references: [establishments.id],
    }),
  }),
);
