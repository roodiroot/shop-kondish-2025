"use client";

import { Rating as ReactRating, Star } from "@smastrom/react-rating";

const myStyles = {
  itemShapes: Star,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  return (
    <div className="flex gap-2">
      <ReactRating
        style={{ maxWidth: 100 }}
        itemStyles={myStyles}
        value={rating}
        readOnly
      />
      <span className="text-sm text-gray-600">({rating})</span>
    </div>
  );
};

export default Rating;
