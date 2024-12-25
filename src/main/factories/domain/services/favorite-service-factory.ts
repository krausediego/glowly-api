import { Favorite, FavoriteCreate, FavoriteRemove } from '@/domain/interfaces';
import {
  FavoriteCreateService,
  FavoriteRemoveService,
} from '@/domain/services';

const favoriteCreate = (): FavoriteCreate => {
  return new FavoriteCreateService();
};

const favoriteRemove = (): FavoriteRemove => {
  return new FavoriteRemoveService();
};

const services = {
  favoriteCreate,
  favoriteRemove,
};

const makeFavoriteService = (
  serviceName: Favorite.FavoriteServicesName,
): Favorite.FavoriteServices => {
  return services[serviceName];
};

export { makeFavoriteService };
