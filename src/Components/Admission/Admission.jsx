import { Link } from "react-router-dom";
import useColleges from "../../Hooks/useColleges";
import Loader from "../Loader/Loader";

const Admission = () => {
  const [colleges, loading] = useColleges();

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {loading ? (
        <Loader />
      ) : (
        colleges.map((college) => (
          <Link
            to={`/singleColleges/${college._id}`}
            key={college._id}
            className="bg-cyan-900 rounded-xl text-white p-4">
            <div className="flex items-center">
              <img
                className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-md mr-3"
                src={college.logo}
                alt={college.collegeName}
              />
              <h3 className="text-lg font-semibold">{college.collegeName}</h3>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Admission;
