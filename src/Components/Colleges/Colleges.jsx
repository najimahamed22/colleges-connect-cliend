import { Link } from "react-router-dom";
import useColleges from "../../Hooks/useColleges";
import { FaCalendarAlt, FaFlask } from "react-icons/fa";
import Loader from "../Loader/Loader";

const Colleges = () => {
  const [colleges, loading] = useColleges();

  return (
    <div>
      <h3 className="text-4xl text-center py-3 font-bold text-[#007E70]">
        College List
      </h3>
      {loading ? (
        // Show the loader when data is still loading
        <Loader />
      ) : (
        <div className="grid p-4 text-white grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {colleges.map((college) => (
            <div
              key={college._id}
              className="bg-cyan-900 rounded-lg shadow-lg p-6">
              <img
                className="w-full h-40 transition duration-300 ease-in-out hover:scale-110 object-cover rounded-md mb-4"
                src={college.collegeImg}
                alt={college.collegeName}
              />
              <h3 className="text-xl font-semibold mb-2">
                {college.collegeName}
              </h3>
              <div className="flex items-center mb-2">
                <p className="text-lg font-medium">Rating: </p>
                <div className="ml-1 flex gap-1">
                  {Array.from({ length: college.rating }, (_, index) => (
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
                </div>
              </div>
              <div className="flex items-center mb-2">
                <FaCalendarAlt className="text-[#007E70] w-5 h-5 mr-1" />
                <div className="flex gap-2 items-center">
                  <p className="text-lg font-medium">Admission Date:</p>{" "}
                  <p>{college.admissionDate}</p>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <FaFlask className="text-[#007E70] w-5 h-5 mr-1" />
                <div className="flex gap-2 items-center">
                  <p className="text-lg font-medium">Number of Research:</p>{" "}
                  <p>{college.numOfResearch}</p>
                </div>
              </div>
              <Link
                to={`/colleges/${college._id}`}
                className="w-full btn hover:bg-[#007E70] bg-[#007E70] text-xl rounded-lg text-white py-2 font-semibold">
                Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Colleges;
