import { EstablishmentCreate, EstablishmentFindAll } from '.';

export namespace Establishment {
  export type EstablishmentServicesName =
    | 'establishmentCreate'
    | 'establishmentFindAll';

  export type EstablishmentServices = () =>
    | EstablishmentCreate
    | EstablishmentFindAll;
}
