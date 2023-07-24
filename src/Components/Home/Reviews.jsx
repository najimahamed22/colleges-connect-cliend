import useReviews from "../../Hooks/useReviews";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import the base styles
import "swiper/css/navigation"; // Import the navigation styles (optional)
import Loader from "../Loader/Loader";

const Reviews = () => {
  const [reviews, loading] = useReviews();

  // Check if the data is loaded, if not, you can display a loading message or a spinner.
  if (loading) {
    return <Loader />;
  }

  // Duplicate slides to achieve two-sided looping
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <div className="w-full p-2 md:p-5 md:pt-0">
      <h3 className="text-4xl text-center my-8 font-bold text-[#007E70]">
        Featured Colleges
      </h3>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          // Configurations for larger devices (e.g., screens wider than 640px)
          640: {
            slidesPerView: 2, // Two slides per view on larger devices
          },
        }}
        loop>
        {duplicatedReviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="bg-cyan-900  text-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center">
                <img
                  src={review.logo}
                  alt={review.collegeName}
                  className="w-20 bg-white h-20 rounded-md mx-auto my-4"
                />
                <img
                  src={review.image}
                  alt={review.candidateName}
                  className="w-20 h-20 rounded-full mx-auto my-4"
                />
              </div>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold mb-2">
                  College Name: {review.collegeName}
                </h2>
                <h2 className="text-lg font-bold mb-2">
                  Name: {review.candidateName}
                </h2>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {Array.from({ length: review.rating }, (_, index) => (
                    <svg
                      key={index}
                      className="w-5 h-5 fill-current text-yellow-400"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        d="M10 0l2.4 6.9H20l-5 3.9 1.8 6.3L10 15l-5.8 4.1 1.8-6.3-5-3.9h7.6z"
                      />
                    </svg>
                  ))}
                  <p className="ms-2 font-bold">{review.rating}</p>
                </div>
                <p className="text-base mt-2">
                  <span className="text-xl font-semibold">Subject : </span>{" "}
                  <span className="uppercase"> {review.subject}</span>
                </p>
              </div>
              <p className="mt-2 text-center font-bold text-xl">
                {review.ratingText}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
