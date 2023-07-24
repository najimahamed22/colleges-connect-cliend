import useReaSearchPaper from "../../Hooks/useReaSearchPaper";
import Loader from "../Loader/Loader";

const ReaSearchPaper = () => {
  const [researchPaper, loading] = useReaSearchPaper();

  return (
    <div className="w-full p-2 md:p-5 md:pt-0">
      <h3 className="text-4xl text-center my-8 font-bold text-[#007E70]">
        ReaSearch Paper
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          // Show the loader when data is still loading
          <Loader />
        ) : (
          researchPaper.map((paper) => (
            <div
              key={paper._id}
              className="border rounded-lg p-4 text-white shadow-md flex flex-col justify-between items-center bg-cyan-900">
              <div className="flex gap-4 px-2 justify-between items-center w-full">
                <img
                  src={paper.studentImage}
                  alt={paper.studentName}
                  className="w-32 h-32 transition duration-300 ease-in-out hover:scale-110  rounded-full"
                />
                <div>
                  <p className="text-xl font-semibold">
                    By: {paper.studentName}
                  </p>
                  <p className="">Date: {paper.date}</p>
                </div>
              </div>
              <h4 className="font-bold mt-4">{paper.title}</h4>
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn hover:bg-[#007E70] bg-[#007E70] text-xl rounded-lg text-white font-semibold mt-4">
                Read More
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReaSearchPaper;
