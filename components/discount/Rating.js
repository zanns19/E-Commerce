import { Star } from "lucide-react";

export default function Rating({ rating = 5 }) {
  const numericRating = Number(rating) || 5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              numericRating >= star
                ? "fill-amber-400 text-amber-400"
                : "text-slate-200"
            }`}
          />
        ))}
      </div>
      <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
        {numericRating.toFixed(1)}
      </span>
    </div>
  );
}