import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="mb-5">
      <section>
        <div className="w-full mx-auto bg-cyan-900">
          <div className="flex flex-col  md:flex-row items-center justify-center">
            <div className="md:w-1/2 md:mx-10 text-white p-5">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ">
                Colleges Connect
              </h2>
              <p className="text-lg mb-6 font-semibold">
                College Connect: A social platform connecting students & alumni,
                fostering community, sharing achievements, and facilitating
                career growth & mentorship opportunities.
              </p>
              <Link
                to="/colleges"
                className="text-xl btn bg-[#007E70] hover:bg-[#007E70] text-white font-semibold rounded  mt-4">
                View Colleges
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://media1.moneywise.com/a/18690/best-colleges-east-coast_facebook_thumb_1200x628_v20210923100124.jpg"
                alt="Dolltopia Banner"
                className=" shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
