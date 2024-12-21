import { EstablishmentCreate } from '.';

export namespace Establishment {
  export type EstablishmentServicesName = 'establishmentCreate';

  export type EstablishmentServices = () => EstablishmentCreate;
}
