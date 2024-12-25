import { UnauthorizedError } from '@/application/errors';
import { getHttpError, ok } from '@/application/helpers';
import { Controller, Http } from '@/application/interfaces';
import { Favorite, FavoriteCreate, FavoriteRemove } from '@/domain/interfaces';

export class FavoriteController implements Controller {
  constructor(
    private readonly serviceName: Favorite.FavoriteServicesName,
    private readonly service: Favorite.FavoriteServices,
  ) {}

  public async handle({
    data: params,
    locals,
  }: Http.Request<any>): Promise<Http.Response> {
    return this?.[this.serviceName]({ params, locals }).catch((e: any) =>
      getHttpError(e),
    );
  }

  private async favoriteCreate({
    params,
    locals,
  }: FavoriteCreate.ParamsService): Promise<Http.Response> {
    if (!locals.sub) {
      throw new UnauthorizedError('Access denied.', 20);
    }

    const content = await (this.service() as FavoriteCreate).run({
      ...params,
      userId: locals.sub,
    });

    return ok({ ...content });
  }

  private async favoriteRemove({
    params,
    locals,
  }: FavoriteRemove.ParamsService): Promise<Http.Response> {
    if (!locals.sub) {
      throw new UnauthorizedError('Access denied.', 20);
    }

    const content = await (this.service() as FavoriteRemove).run({
      ...params,
      userId: locals.sub,
    });

    return ok({ ...content });
  }
}
