export default function Rating({ rating }) {
  return (
    <div className="flex items-center mt-3">

      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            rating >= star
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625..." />
        </svg>
      ))}

      <span className="ml-3 bg-blue-100 px-2 rounded">
        {rating}
      </span>

    </div>
  );
}