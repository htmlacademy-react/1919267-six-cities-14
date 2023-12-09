import ReviewItem from '../review-item/review-item';
import { Review } from '../../types/review';
import { AuthorizationStatus, MAX_SHOWN_REVIEWS } from '../../const';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviews } from '../../store/api-actions';
import ReviewForm from '../review-form/review-form';

type ReviewsListProps = {
  offerId: string | undefined;
}

function ReviewsList({offerId}: ReviewsListProps): JSX.Element {
  const reviews = useAppSelector((state) => state.reviews);
  const sortedReviews = reviews.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const reviewsToShow = sortedReviews.slice(0, MAX_SHOWN_REVIEWS);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (offerId) {
      dispatch(fetchReviews(offerId));
    }
  }, [dispatch, offerId]);

  return(
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviewsToShow.map((item: Review) => <ReviewItem key={item.id} {...item}/>)}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />}
    </section>
  );

}
export default ReviewsList;
