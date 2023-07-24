import { FallingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <FallingLines
        color="#007E70"
        width={100}
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
};

export default Loader;
