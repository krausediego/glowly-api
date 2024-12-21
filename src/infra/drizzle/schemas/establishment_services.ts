import { relations } from 'drizzle-orm';
import { numeric, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

import {
  appointments,
  establishments,
  establishmentSpecialistServices,
} from '.';

export const establishmentServices = pgTable('establishment_services', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  name: text('name').notNull(),
  value: numeric('value').notNull(),
  time: numeric('time').notNull(),
  imageURL: text('image_url'),
  description: text('description'),
  establishmentId: text('establishment_id')
    .references(() => establishments.id, { onDelete: 'set null' })
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const establishmentServicesRelations = relations(
  establishmentServices,
  ({ one, many }) => ({
    establishment: one(establishments, {
      fields: [establishmentServices.establishmentId],
      references: [establishments.id],
    }),
    establishmentSpecialistService: many(establishmentSpecialistServices),
    appointment: many(appointments),
  }),
);
