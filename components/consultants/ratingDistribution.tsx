import React from "react";
import { Star } from "lucide-react";

const RatingDistribution = () => {
  const ratings = [
    { stars: 5, percent: 80 },
    { stars: 4, percent: 60 },
    { stars: 3, percent: 35 },
    { stars: 2, percent: 15 },
    { stars: 1, percent: 5 },
  ];

  return (
    <div className="w-[755px] bg-[#F7F7F7] p-6 rounded-[32px] border border-[#D7D7D7] space-y-6">
      {ratings.map((rating) => (
        <div key={rating.stars} className="flex items-center gap-4">
          {/* Star label */}
          <div className="flex items-center w-[50px]">
            <span className="text-[14px] font-medium">{rating.stars} Stars</span>
          </div>

          {/* Line / progress bar */}
          <div className="flex-1 bg-[#E6E6E6] rounded-full h-[8px] relative overflow-hidden">
            <div
              className="bg-[#7E22CE] h-[8px] rounded-full transition-all duration-500"
              style={{ width: `${rating.percent}%` }}
            ></div>
          </div>

          {/* Percent label */}
          <span className="text-[12px] font-semibold text-[#A2A2A2] w-[40px] text-right">
            {rating.percent}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default RatingDistribution;
