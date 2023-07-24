import { useEffect, useState } from "react";

const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://colleges-connectserver.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      });
  }, []);
  return [reviews, loading];
};

export default useReviews;
