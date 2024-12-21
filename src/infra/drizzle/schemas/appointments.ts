import { relations } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

import { establishmentServices, establishmentSpecialists, users } from '.';

export const appointments = pgTable('appointments', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  date: timestamp('date', { withTimezone: true }).notNull(),
  status: boolean('status').notNull(),
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'set null' })
    .notNull(),
  establishmentSpecialistsId: text('establishment_specialists_id')
    .references(() => establishmentSpecialists.id, { onDelete: 'set null' })
    .notNull(),
  establishmentServicesId: text('establishment_services_id')
    .references(() => establishmentServices.id, { onDelete: 'set null' })
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  establishmentSpecialist: one(establishmentSpecialists, {
    fields: [appointments.establishmentSpecialistsId],
    references: [establishmentSpecialists.id],
  }),
  establishmentService: one(establishmentServices, {
    fields: [appointments.establishmentServicesId],
    references: [establishmentServices.id],
  }),
}));
