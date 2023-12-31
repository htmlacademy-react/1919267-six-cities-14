import ReviewItem from '../review-item/review-item';
import { Review } from '../../types/review';
import { AuthorizationStatus, MAX_SHOWN_REVIEWS } from '../../const';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviews } from '../../store/api-actions';
import ReviewForm from '../review-form/review-form';
import { Offer } from '../../types/offer';
import { selectReviews } from '../../store/reviews-data/selectors';
import { selectAuthorizationStatus } from '../../store/user-data/selectors';

type ReviewsListProps = {
  offerId: Offer['id'];
}

function ReviewsList({offerId}: ReviewsListProps): JSX.Element {
  const reviews = useAppSelector(selectReviews);
  const sortedReviews = reviews.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const reviewsToShow = sortedReviews.slice(0, MAX_SHOWN_REVIEWS);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReviews(offerId));
  }, [dispatch, offerId]);

  return(
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">
          {
            reviews.length > 10
              ? `${MAX_SHOWN_REVIEWS} of ${reviews.length}`
              : reviews.length
          }
        </span>
      </h2>
      <ul className="reviews__list">
        {reviewsToShow.map((item: Review) => <ReviewItem key={item.id} {...item}/>)}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm id={offerId}/>}
    </section>
  );

}
export default ReviewsList;
