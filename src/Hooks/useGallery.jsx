import { useEffect, useState } from "react";

const useGallery = () => {
  const [gallery, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://colleges-connectserver.vercel.app/gallery")
      .then((res) => res.json())
      .then((data) => {
        setColleges(data);
        setLoading(false);
      });
  }, []);
  return [gallery, loading];
};

export default useGallery;
