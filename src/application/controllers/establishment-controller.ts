import { UnauthorizedError } from '@/application/errors';
import { getHttpError, ok } from '@/application/helpers';
import { Controller, Http } from '@/application/interfaces';
import { Establishment, EstablishmentCreate } from '@/domain/interfaces';

export class EstablishmentController implements Controller {
  constructor(
    private readonly serviceName: Establishment.EstablishmentServicesName,
    private readonly service: Establishment.EstablishmentServices,
  ) {}

  public async handle({
    data: params,
    locals,
  }: Http.Request<any>): Promise<Http.Response> {
    return this?.[this.serviceName]({ params, locals }).catch((e: any) =>
      getHttpError(e),
    );
  }

  private async establishmentCreate({
    params,
    locals,
  }: EstablishmentCreate.ParamsService): Promise<Http.Response> {
    if (!locals.sub) {
      throw new UnauthorizedError('Access denied.', 20);
    }

    const content = await (this.service() as EstablishmentCreate).run({
      ...params,
      userId: locals.sub,
    });

    return ok({ ...content });
  }
}
