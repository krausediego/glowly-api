import { ReviewCreate } from '.';

export namespace Review {
  export type ReviewServicesName = 'reviewCreate';

  export type ReviewServices = () => ReviewCreate;
}
