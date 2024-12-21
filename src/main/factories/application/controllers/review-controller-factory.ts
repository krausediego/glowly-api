import { ReviewController } from '@/application/controllers';
import { Review } from '@/domain/interfaces';
import { makeReviewService } from '@/main/factories/domain/services';

export const makeReviewController = (
  serviceName: Review.ReviewServicesName,
) => {
  return new ReviewController(serviceName, makeReviewService(serviceName));
};
