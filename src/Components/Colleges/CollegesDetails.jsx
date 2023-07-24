import { useLoaderData } from "react-router-dom";
import {
  FaCalendarAlt,
  FaFlask,
  FaCalendarCheck,
  FaHistory,
  FaBookOpen,
  FaRunning,
} from "react-icons/fa";

const CollegesDetails = () => {
  const college = useLoaderData();
  console.log(college);

  return (
    <div className="w-full p-2 md:p-6">
      <h3 className="text-4xl text-center pb-5 font-bold text-[#007E70]">
        {college.collegeName}
      </h3>
      <div className="bg-cyan-900 p-5 text-white rounded-lg shadow-lg ">
        <div className="flex justify-around">
          <div>
            <img
              src={college.logo}
              alt={college.collegeName}
              className="w-32 h-32 rounded-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">{college.collegeName}</h2>
            <div className="flex items-center mb-4">
              <p className="">Rating: </p>
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
          </div>
        </div>

        <hr className="my-4" />
        <div className="flex items-center mb-2">
          <FaCalendarCheck className="text-[#007E70] text-2xl  mr-2" />
          <h3 className="text-2xl font-semibold mb-2">Events</h3>
        </div>
        <p>{college.events}</p>
        <hr className="my-4" />
        <div className="flex items-center mb-2">
          <FaHistory className="text-[#007E70] text-2xl  mr-2" />
          <h3 className="text-2xl font-semibold mb-2">Research History</h3>
        </div>
        <p>{college.researchHistory}</p>
        <hr className="my-4" />
        <div className="flex items-center mb-2">
          <FaBookOpen className="text-[#007E70] text-2xl  mr-2" />
          <h3 className="text-2xl font-semibold mb-2">Research Works</h3>
        </div>
        <ul className="ps-5">
          {college.researchWorks.map((work, index) => (
            <li className="list-disc" key={index}>
              {work}
            </li>
          ))}
        </ul>
        <hr className="my-4" />
        <div className="flex items-center mb-2">
          <FaRunning className="text-[#007E70] text-2xl  mr-2" />
          <h3 className="text-2xl font-semibold mb-2">Sports</h3>
        </div>
        <p>{college.sports}</p>
      </div>
    </div>
  );
};

export default CollegesDetails;
