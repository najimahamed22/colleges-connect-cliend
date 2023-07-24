import { useEffect, useState } from "react";

const useReaSearchPaper = () => {
  const [researchPaper, setResearchPaper] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://colleges-connectserver.vercel.app/researchPaper")
      .then((res) => res.json())
      .then((data) => {
        setResearchPaper(data);
        setLoading(false);
      });
  }, []);
  return [researchPaper, loading];
};

export default useReaSearchPaper;
