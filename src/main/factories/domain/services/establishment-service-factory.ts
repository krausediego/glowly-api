import { Establishment, EstablishmentCreate } from '@/domain/interfaces';
import { EstablishmentCreateService } from '@/domain/services/establishment';

import { makeToken } from '../../infra';

const establishmentCreate = (): EstablishmentCreate => {
  return new EstablishmentCreateService(makeToken());
};

const services = {
  establishmentCreate,
};

const makeEstablishmentService = (
  serviceName: Establishment.EstablishmentServicesName,
): Establishment.EstablishmentServices => {
  return services[serviceName];
};

export { makeEstablishmentService };
