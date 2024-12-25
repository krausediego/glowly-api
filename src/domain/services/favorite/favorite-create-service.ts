import { and, eq } from 'drizzle-orm';

import { BadRequestError } from '@/application/errors';
import { FavoriteCreate } from '@/domain/interfaces';
import { drizzle } from '@/infra/drizzle/drizzle';
import { userFavorites } from '@/infra/drizzle/schemas';

export class FavoriteCreateService implements FavoriteCreate {
  constructor() {}

  async run(params: FavoriteCreate.Params): Promise<FavoriteCreate.Response> {
    const { userId, establishmentId } = params;

    const establishment = await drizzle.query.establishments.findFirst({
      where(fields) {
        return eq(fields.id, establishmentId);
      },
    });

    if (!establishment) {
      throw new BadRequestError(
        'The establishment informed does not exist',
        25,
      );
    }

    const favorite = await drizzle.query.userFavorites.findFirst({
      where(fields) {
        return and(
          eq(fields.userId, userId),
          eq(fields.establishmentId, establishmentId),
        );
      },
    });

    if (favorite) {
      throw new BadRequestError(
        'This establishment is already in your favorites',
        26,
      );
    }

    await await drizzle
      .insert(userFavorites)
      .values({ userId, establishmentId });

    return {
      message: 'Favorito adicionado com sucesso!',
    };
  }
}
