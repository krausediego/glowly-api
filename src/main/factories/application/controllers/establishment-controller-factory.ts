import { EstablishmentController } from '@/application/controllers';
import { Controller } from '@/application/interfaces';
import { Establishment } from '@/domain/interfaces';
import { makeEstablishmentService } from '@/main/factories/domain/services';

export const makeEstablishmentController = (
  serviceName: Establishment.EstablishmentServicesName,
): Controller => {
  return new EstablishmentController(
    serviceName,
    makeEstablishmentService(serviceName),
  );
};
