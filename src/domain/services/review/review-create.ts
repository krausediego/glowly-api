import { and, eq } from 'drizzle-orm';

import { BadRequestError } from '@/application/errors';
import { ReviewCreate } from '@/domain/interfaces';
import { drizzle } from '@/infra/drizzle/drizzle';
import { establishmentReviews } from '@/infra/drizzle/schemas';

export class ReviewCreateService implements ReviewCreate {
  constructor() {}

  async run(params: ReviewCreate.Params): Promise<ReviewCreate.Response> {
    const { userId, establishmentId, ...rest } = params;

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

    const establishmentReviewExists =
      await drizzle.query.establishmentReviews.findFirst({
        where(fields) {
          return and(
            eq(fields.establishmentId, establishmentId),
            eq(fields.userId, userId),
          );
        },
      });

    if (establishmentReviewExists) {
      throw new BadRequestError(
        'You have already made a review for this establishment.',
        24,
      );
    }

    await drizzle.insert(establishmentReviews).values({
      establishmentId,
      userId,
      ...rest,
    });

    return {
      message: 'Avaliação criada com sucesso !',
    };
  }
}
