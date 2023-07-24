import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const { error } = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <img
          src="https://d33wubrfki0l68.cloudfront.net/7532cdd5fcdc574e355f74717c61897907ed9ff1/d86a7/assets/img/logo/logo.png"
          alt="404 Error"
          className="w-40 rounded-full  animate-spin h-40 mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold text-red-700 mb-2">
          {status || "404"} Error
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          {error?.message || "Oops! Something went wrong."}
        </p>
        <Link
          to="/"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg">
          Go back to homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
