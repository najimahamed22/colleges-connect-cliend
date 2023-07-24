import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#007E70]">
      <div className="mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-white">
            <div>
              <img
                src="https://d33wubrfki0l68.cloudfront.net/7532cdd5fcdc574e355f74717c61897907ed9ff1/d86a7/assets/img/logo/logo.png"
                alt="Logo"
                className="h-40 w-15 rounded-full bg-white border-white  ml-2"
              />
            </div>
          </div>
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-4"> Colleges Connect</h2>
            <p className="text-sm">
              Colleges Connect: A dynamic platform fostering connections among
              students, educators & alumni. Empowering growth through networking
              & collaboration.
            </p>
            <div className="flex space-x-8 text-white  text-center text-4xl mt-4">
              <a href="#" className="hover:text-sky-400">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-sky-400">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-sky-400">
                <FaInstagram />
              </a>
            </div>
          </div>
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 font-bold">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/colleges">Colleges</Link>
              </li>
              <li>
                <Link to="/admission">Admission</Link>
              </li>
              <li>
                <Link to="/mycollege">My College</Link>
              </li>
            </ul>
          </div>
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <div className="flex items-center mb-2">
              <FaPhone className="mr-2" />
              <p>+1 123-456-7890</p>
            </div>
            <div className="flex items-center mb-2">
              <FaEnvelope className="mr-2" />
              <p className="text-base md:text-sm lg:text-base">
                info@collegesconnect.com
              </p>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <p>123 Main Street, City, Country</p>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-700" />
        <div className=" md:text-xl text-center sm:text-base">
          <p className=" text-white mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Colleges Connect. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
