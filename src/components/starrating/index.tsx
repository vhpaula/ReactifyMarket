import React from "react";
import Rating from "react-rating-stars-component";

interface StarRatingProps {
    rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    return (
        <Rating
            count={5}
            size={20}
            value={rating}
            edit={false}
            activeColor="#FFD700"
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
        />
    );
};

export default StarRating;
