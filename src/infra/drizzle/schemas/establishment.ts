import { relations } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

import {
  establishmentAddresses,
  establishmentCategories,
  establishmentReviews,
  establishmentServices,
  establishmentSpecialists,
} from '.';

export const establishments = pgTable('establishment', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  status: boolean('status').notNull().default(true),
  logoURL: text('logo_url'),
  description: text('description'),
  email: text('email'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const establishmentRelations = relations(
  establishments,
  ({ one, many }) => ({
    establishmentAddress: one(establishmentAddresses),
    establishmentCategory: many(establishmentCategories),
    establishmentService: many(establishmentServices),
    establishmentReview: many(establishmentReviews),
    establishmentSpecialist: many(establishmentSpecialists),
  }),
);
