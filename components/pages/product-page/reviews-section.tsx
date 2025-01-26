const ReviewsSection = () => {
  const reviewsCount = 1624;

  return (
    <div className="mt-3">
      <h3 className="sr-only">Отзывы</h3>
      <div className="flex items-center">
        <div className="flex items-center">
          <div>
            <svg
              width="97"
              height="20"
              viewBox="0 0 97 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {[...Array(5)].map((_, index) => (
                <path
                  key={index}
                  d={`M${index * 18 + 9.79} 1.95C${index * 18 + 10} 1.32 ${
                    index * 18 + 10.9
                  } 1.32 ${index * 18 + 11.12} 1.95L${
                    index * 18 + 12.64
                  } 6.43C${index * 18 + 12.73} 6.72 ${index * 18 + 13} 6.91 ${
                    index * 18 + 13.3
                  } 6.91H${index * 18 + 18.16}C${index * 18 + 18.84} 6.91 ${
                    index * 18 + 19.12
                  } 7.79 ${index * 18 + 18.56} 8.18L${
                    index * 18 + 14.68
                  } 10.88C${index * 18 + 14.42} 11.06 ${
                    index * 18 + 14.31
                  } 11.38 ${index * 18 + 14.42} 11.68L${
                    index * 18 + 15.91
                  } 16.08C${index * 18 + 16.13} 16.72 ${
                    index * 18 + 15.4
                  } 17.26 ${index * 18 + 14.85} 16.88L${
                    index * 18 + 10.85
                  } 14.1C${index * 18 + 10.61} 13.93 ${
                    index * 18 + 10.29
                  } 13.93 ${index * 18 + 10.05} 14.1L${
                    index * 18 + 6.05
                  } 16.88C${index * 18 + 5.5} 17.26 ${
                    index * 18 + 4.78
                  } 16.72 ${index * 18 + 4.99} 16.08L${
                    index * 18 + 6.48
                  } 11.68C${index * 18 + 6.58} 11.38 ${
                    index * 18 + 6.48
                  } 11.06 ${index * 18 + 6.22} 10.88L${
                    index * 18 + 2.34
                  } 8.18C${index * 18 + 1.78} 7.79 ${index * 18 + 2.06} 6.91 ${
                    index * 18 + 2.74
                  } 6.91H${index * 18 + 7.6}C${index * 18 + 7.9} 6.91 ${
                    index * 18 + 8.17
                  } 6.72 ${index * 18 + 8.27} 6.43L${index * 18 + 9.79} 1.95Z`}
                  fill="#f97316"
                />
              ))}
            </svg>
          </div>
          <div className="text-sm ml-2 text-gray-500">
            {reviewsCount} отзыва
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
