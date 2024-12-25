import { FavoriteController } from '@/application/controllers';
import { Controller } from '@/application/interfaces';
import { Favorite } from '@/domain/interfaces';
import { makeFavoriteService } from '@/main/factories/domain/services';

export const makeFavoriteController = (
  serviceName: Favorite.FavoriteServicesName,
): Controller => {
  return new FavoriteController(serviceName, makeFavoriteService(serviceName));
};
