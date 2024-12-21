import { Review, ReviewCreate } from '@/domain/interfaces';
import { ReviewCreateService } from '@/domain/services/review';

const reviewCreate = (): ReviewCreate => {
  return new ReviewCreateService();
};

const services = {
  reviewCreate,
};

const makeReviewService = (
  serviceName: Review.ReviewServicesName,
): Review.ReviewServices => {
  return services[serviceName];
};

export { makeReviewService };
