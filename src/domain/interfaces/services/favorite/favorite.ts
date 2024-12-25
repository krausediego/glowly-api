import { FavoriteCreate, FavoriteRemove } from '.';

export namespace Favorite {
  export type FavoriteServicesName = 'favoriteCreate' | 'favoriteRemove';

  export type FavoriteServices = () => FavoriteCreate | FavoriteRemove;
}
