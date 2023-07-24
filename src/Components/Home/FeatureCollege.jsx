import { Link } from "react-router-dom";
import useColleges from "../../Hooks/useColleges";
import { FaCalendarAlt, FaFlask, FaMusic, FaRunning } from "react-icons/fa";
import Loader from "../Loader/Loader";

const FeatureCollege = () => {
  const [colleges, loading] = useColleges();
  const featureColleges = colleges.filter(
    (college) => college.category === "popular"
  );
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="px-4 md:px-8">
      <h3 className="text-4xl text-center my-8 font-bold text-[#007E70]">
        Featured Colleges
      </h3>
      <div className="grid md:grid-cols-3 gap-6 my-8">
        {featureColleges.map((college) => (
          <div
            className="bg-cyan-900 text-white rounded-lg shadow-md"
            key={college._id}>
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                className="w-full h-48 transition duration-300 ease-in-out hover:scale-110  object-cover"
                src={college.collegeImg}
                alt="college"
              />
            </div>
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{college.collegeName}</h2>
              <div className="flex items-center mb-2">
                <FaCalendarAlt className="text-[#007E70] w-4 h-4 mr-1" />
                <p className="font-semibold text-lg ">
                  {college.admissionDate}
                </p>
              </div>
              <div className="flex items-center mb-2">
                <FaFlask className="text-[#007E70] w-4 h-4 mr-1" />
                <p className="font-semibold text-lg">{college.research}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaMusic className="text-[#007E70] w-4 h-4 mr-1" />
                <p className="font-semibold text-lg">{college.event}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaRunning className="text-[#007E70] w-4 h-4 mr-1" />
                <p className="font-semibold text-lg">{college.sport}</p>
              </div>
              <Link
                to={`/colleges/${college._id}`}
                className="w-full btn hover:bg-[#007E70] bg-[#007E70] text-xl rounded-lg text-white  font-semibold">
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCollege;
