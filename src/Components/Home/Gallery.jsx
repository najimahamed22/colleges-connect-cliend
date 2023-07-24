import useGallery from "../../Hooks/useGallery";
import Loader from "../Loader/Loader";

const Gallery = () => {
  const [gallery, loading] = useGallery();

  return (
    <div className="px-4 md:px-8">
      <h3 className="text-4xl text-center my-8 font-bold text-[#007E70]">
        Featured Colleges
      </h3>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {loading ? (
          // Show the loader when data is still loading
          <Loader />
        ) : (
          gallery.map((image) => (
            <div key={image._id} className="border rounded-lg overflow-hidden">
              <div className="bg-cyan-900 p-2">
                <img
                  className="w-full transition duration-300 ease-in-out hover:scale-110  h-64 object-cover"
                  src={image.img}
                  alt={`Gallery ${image._id}`}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Gallery;
