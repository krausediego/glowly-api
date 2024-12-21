import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

import {
  appointments,
  establishments,
  establishmentSpecialistPermissions,
  establishmentSpecialistServices,
  users,
} from '.';

export const establishmentSpecialists = pgTable('establishment_specialists', {
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

export const establishmentSpecialistsRelations = relations(
  establishmentSpecialists,
  ({ one, many }) => ({
    user: one(users, {
      fields: [establishmentSpecialists.userId],
      references: [users.id],
    }),
    establishment: one(establishments, {
      fields: [establishmentSpecialists.establishmentId],
      references: [establishments.id],
    }),
    establishmentSpecialistService: many(establishmentSpecialistServices),
    appointment: many(appointments),
    establishmentSpecialistPermission: many(establishmentSpecialistPermissions),
  }),
);
