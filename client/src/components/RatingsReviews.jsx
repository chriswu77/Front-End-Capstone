import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SortBy from './RatingsReviews/SortBy';
import ReviewList from './RatingsReviews/ReviewList';

const RatingsReviews = (props) => {
  const { currentItem } = props;
  const { id, name } = currentItem;
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(2);
  const [totalReviews, setTotalReviews] = useState(0);

  const getCountReviews = () => {
    if (Object.keys(currentItem).length > 0) {
      axios.get(`/api/reviews2/${id}/${count}`)
        .then((results) => {
          const countReviews = results.data.results;
          setReviews(countReviews);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const getTotalReviews = () => {
    if (Object.keys(currentItem).length > 0) {
      axios.get(`/api/reviews2/${id}/100000`)
        .then((results) => {
          const totalReviewsArrLength = results.data.results.length;
          setTotalReviews(totalReviewsArrLength);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getCountReviews();
    getTotalReviews();
  }, [id, count]);

  return (
    <div className="ratingsReview-container">
      <div className="ratingsReview-title">
        Ratings & Reviews
      </div>
      <div className="ratingsReviewList-container">
        <div className="ratings">
          Ratings
          <br />
          (ID is equal to &nbsp;
          {id}
          )
          {/* <Ratings ratings={ratings}/> */}
        </div>
        <div className="reviewList">
          Review List
          <br />
          (Product name is &nbsp;
          {name}
          )
          <br />
          {(totalReviews < 1) ?
            <button type="submit">Submit a new review!</button>
            : (
              <span>
                <div className="sortBy-container">
                  <SortBy totalReviews={totalReviews} />
                </div>
                <div className="reviews-container">
                  {reviews.map((review) => (
                    <ReviewList review={review} key={review.review_id} />
                  ))}
                </div>
                <div className="buttons-container">
                  {(count > 1 && count < totalReviews) ?
                    <button type="button" onClick={() => setCount(count + 2)}>More Reviews</button>
                    :
                    null}
                  <button type="button">Add Review</button>
                </div>
              </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default RatingsReviews;
