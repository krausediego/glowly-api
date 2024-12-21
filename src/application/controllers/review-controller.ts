import { UnauthorizedError } from '@/application/errors';
import { getHttpError, ok } from '@/application/helpers';
import { Controller, Http } from '@/application/interfaces';
import { Review, ReviewCreate } from '@/domain/interfaces';

export class ReviewController implements Controller {
  constructor(
    private readonly serviceName: Review.ReviewServicesName,
    private readonly service: Review.ReviewServices,
  ) {}

  public async handle({
    data: params,
    locals,
  }: Http.Request<any>): Promise<Http.Response> {
    return this?.[this.serviceName]({ params, locals }).catch((e: any) =>
      getHttpError(e),
    );
  }

  private async reviewCreate({
    params,
    locals,
  }: ReviewCreate.ParamsService): Promise<Http.Response> {
    if (!locals.sub) {
      throw new UnauthorizedError('Access denied.', 20);
    }

    const content = await (this.service() as ReviewCreate).run({
      ...params,
      userId: locals.sub,
    });

    return ok({ ...content });
  }
}
