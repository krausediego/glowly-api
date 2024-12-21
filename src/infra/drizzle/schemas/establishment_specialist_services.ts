import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

import { establishmentServices, establishmentSpecialists } from '.';

export const establishmentSpecialistServices = pgTable(
  'establishment_specialist_services',
  {
    id: text('id')
      .$defaultFn(() => randomUUID())
      .primaryKey(),
    establishmentSpecialistId: text('establishment_specialist_id')
      .references(() => establishmentSpecialists.id, { onDelete: 'set null' })
      .notNull(),
    establishmentServiceId: text('establishment_service_id')
      .references(() => establishmentServices.id, { onDelete: 'set null' })
      .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
);

export const establishmentSpecialistServicesRelations = relations(
  establishmentSpecialistServices,
  ({ one }) => ({
    establishmentSpecialist: one(establishmentSpecialists, {
      fields: [establishmentSpecialistServices.establishmentSpecialistId],
      references: [establishmentSpecialists.id],
    }),
    establishmentService: one(establishmentServices, {
      fields: [establishmentSpecialistServices.establishmentServiceId],
      references: [establishmentServices.id],
    }),
  }),
);
