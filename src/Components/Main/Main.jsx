import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../NavFoot/NavBar";
import Footer from "../NavFoot/Footer";
import Loader from "../Loader/Loader";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a loading mechanism with a 2-second delay
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        {isLoading ? (
          <div className="mb-20">
            <Loader /> {/* Show the Loader component for NavBar */}
          </div>
        ) : (
          <div className="mb-20">
            <NavBar />
          </div>
        )}

        {isLoading ? (
          <div className="flex-1 h-full">
            <Loader /> {/* Show the Loader component for Outlet */}
          </div>
        ) : (
          <div className="flex-1 h-full">
            <Outlet />
          </div>
        )}

        {isLoading ? (
          <div>
            <Loader /> {/* Show the Loader component for Footer */}
          </div>
        ) : (
          <div>
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
