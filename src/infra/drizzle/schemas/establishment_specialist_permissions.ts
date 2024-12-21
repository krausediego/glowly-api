import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

import { establishmentSpecialists, permissions } from '.';

export const establishmentSpecialistPermissions = pgTable(
  'establishment_specialist_permissions',
  {
    id: text('id')
      .$defaultFn(() => randomUUID())
      .primaryKey(),
    establishmentSpecialistId: text('establishment_specialist_id')
      .references(() => establishmentSpecialists.id, { onDelete: 'set null' })
      .notNull(),
    permissionId: text('permission_id')
      .references(() => permissions.id, { onDelete: 'set null' })
      .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
);

export const establishmentSpecialistPermissionsRelations = relations(
  establishmentSpecialistPermissions,
  ({ one }) => ({
    establishmentSpecialist: one(establishmentSpecialists, {
      fields: [establishmentSpecialistPermissions.establishmentSpecialistId],
      references: [establishmentSpecialists.id],
    }),
    permission: one(permissions, {
      fields: [establishmentSpecialistPermissions.permissionId],
      references: [permissions.id],
    }),
  }),
);
