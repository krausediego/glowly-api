import { UnauthorizedError } from '@/application/errors';
import { getHttpError, ok } from '@/application/helpers';
import { Controller, Http, MulterFile } from '@/application/interfaces';
import {
  Establishment,
  EstablishmentCreate,
  EstablishmentFindAll,
} from '@/domain/interfaces';

export class EstablishmentController implements Controller {
  constructor(
    private readonly serviceName: Establishment.EstablishmentServicesName,
    private readonly service: Establishment.EstablishmentServices,
  ) {}

  public async handle({
    data: params,
    file,
    locals,
  }: Http.Request<any>): Promise<Http.Response> {
    return this?.[this.serviceName]({ params, locals, file }).catch((e: any) =>
      getHttpError(e),
    );
  }

  private async establishmentCreate({
    params,
    file,
    locals,
  }: EstablishmentCreate.ParamsService): Promise<Http.Response> {
    if (!locals.sub) {
      throw new UnauthorizedError('Access denied.', 20);
    }

    const content = await (this.service() as EstablishmentCreate).run({
      ...params,
      logo: file as MulterFile,
      userId: locals.sub,
    });

    return ok({ ...content });
  }

  private async establishmentFindAll({
    params,
    locals,
  }: EstablishmentFindAll.ParamsService): Promise<Http.Response> {
    if (!locals.sub) {
      throw new UnauthorizedError('Access denied.', 20);
    }

    const content = await (this.service() as EstablishmentFindAll).run({
      ...params,
      userId: locals.sub,
    });

    return ok({ ...content });
  }
}
