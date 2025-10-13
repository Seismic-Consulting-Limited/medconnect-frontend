import React from "react";
import { Star } from "lucide-react";
import { Card } from "../ui/card";

const RatingDistribution = () => {
  const ratings = [
    { stars: 5, percent: 80 },
    { stars: 4, percent: 60 },
    { stars: 3, percent: 35 },
    { stars: 2, percent: 15 },
    { stars: 1, percent: 5 },
  ];

  return (
    <Card className="w-[755px] p-6 space-y-6">
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
    </Card>
  );
};

export default RatingDistribution;
