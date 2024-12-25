import { and, eq } from 'drizzle-orm';

import { BadRequestError } from '@/application/errors';
import { FavoriteRemove } from '@/domain/interfaces';
import { drizzle } from '@/infra/drizzle/drizzle';
import { userFavorites } from '@/infra/drizzle/schemas';

export class FavoriteRemoveService implements FavoriteRemove {
  constructor() {}

  async run(params: FavoriteRemove.Params): Promise<FavoriteRemove.Response> {
    const { establishmentId, userId } = params;

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

    const userFavorite = await drizzle.query.userFavorites.findFirst({
      where(fields) {
        return eq(fields.establishmentId, establishmentId);
      },
    });

    if (!userFavorite) {
      throw new BadRequestError(
        'This establishment is not in your favorites.',
        27,
      );
    }

    await drizzle
      .delete(userFavorites)
      .where(
        and(
          eq(userFavorites.userId, userId),
          eq(userFavorites.establishmentId, establishmentId),
        ),
      );

    return {
      message: 'Favorito removido com sucesso!',
    };
  }
}
