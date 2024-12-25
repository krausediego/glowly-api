import { eq, sql } from 'drizzle-orm';

import { EstablishmentFindAll } from '@/domain/interfaces';
import { drizzle } from '@/infra/drizzle/drizzle';
import {
  establishmentAddresses,
  establishmentReviews,
  establishments,
  userFavorites,
} from '@/infra/drizzle/schemas';

export class EstablishmentFindAllService implements EstablishmentFindAll {
  constructor() {}

  async run(
    params: EstablishmentFindAll.Params,
  ): Promise<EstablishmentFindAll.Response> {
    const { userId } = params;

    const docs = await drizzle
      .select({
        id: establishments.id,
        name: establishments.name,
        logoURL: establishments.logoURL,
        address: establishmentAddresses.street,
        favorite: sql<boolean>`CASE 
        WHEN COUNT(${userFavorites.userId}) FILTER (WHERE ${userFavorites.userId} = ${userId}) > 0 THEN TRUE 
        ELSE FALSE 
      END`.as('favorite'),
        averageRating:
          sql<number>`COALESCE(AVG(${establishmentReviews.rating}), 0)`.as(
            'averageRating',
          ),
      })
      .from(establishments)
      .leftJoin(
        userFavorites,
        eq(userFavorites.establishmentId, establishments.id),
      )
      .leftJoin(
        establishmentReviews,
        eq(establishmentReviews.establishmentId, establishments.id),
      )
      .leftJoin(
        establishmentAddresses,
        eq(establishmentAddresses.establishmentId, establishments.id),
      )
      .groupBy(
        establishments.id,
        establishments.name,
        establishmentAddresses.street,
      );

    return {
      docs,
    };
  }
}
