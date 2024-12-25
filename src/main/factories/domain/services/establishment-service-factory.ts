import {
  Establishment,
  EstablishmentCreate,
  EstablishmentFindAll,
} from '@/domain/interfaces';
import {
  EstablishmentCreateService,
  EstablishmentFindAllService,
} from '@/domain/services/establishment';

import { makeAws, makeToken } from '../../infra';

const establishmentCreate = (): EstablishmentCreate => {
  return new EstablishmentCreateService(makeToken(), makeAws());
};

const establishmentFindAll = (): EstablishmentFindAll => {
  return new EstablishmentFindAllService();
};

const services = {
  establishmentCreate,
  establishmentFindAll,
};

const makeEstablishmentService = (
  serviceName: Establishment.EstablishmentServicesName,
): Establishment.EstablishmentServices => {
  return services[serviceName];
};

export { makeEstablishmentService };
