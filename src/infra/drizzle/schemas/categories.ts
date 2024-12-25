import { relations } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

import { establishmentCategories } from '.';

export const categories = pgTable('categories', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  status: boolean('status').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  establishmentCategory: many(establishmentCategories),
}));
