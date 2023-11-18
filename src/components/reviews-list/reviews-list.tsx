import ReviewItem from '../review-item/review-item';
import { Review } from '../../types/review';

type ReviewsListProps = {
  reviews: Review[];
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return(
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((item: Review) => <ReviewItem key={item.id} {...item}/>)}
      </ul>
    </>
  );

}
export default ReviewsList;
