import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useColleges from "../../Hooks/useColleges";
import Loader from "../Loader/Loader";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";

const MyCollege = () => {
  const { user } = useAuth();
  const [colleges] = useColleges();
  const email = user?.email;
  const [classDetails, setClassDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollegeId, setSelectedCollegeId] = useState(null);

  useEffect(() => {
    if (email) {
      fetch(`https://colleges-connectserver.vercel.app/classes`)
        .then((res) => res.json())
        .then((data) => {
          setClassDetails(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          setLoading(false);
        });
    }
  }, [email]);

  const filteredData = classDetails.filter(
    (classData) =>
      classData.candidateEmail === email && classData.collegeName !== undefined
  );

  const filteredAndMappedData = filteredData.map((classData) => ({
    ...classData,
    collegeData: colleges.find(
      (college) => college.collegeName === classData.collegeName
    ),
  }));

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEditProfileClick = (collegeId) => {
    setSelectedCollegeId(collegeId);
    setIsModalOpen(true);
    if (filteredAndMappedData.length > 0) {
      const selectedCollege = filteredAndMappedData.find(
        (college) => college._id === collegeId
      );
      setValue("name", selectedCollege.candidateName);
      setValue("address", selectedCollege.address);
      setValue("university", selectedCollege.collegeName);
      setValue("logo", selectedCollege.collegeData?.logo || "");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const reviewData = {
        candidateName: data.name,
        collegeName: data.university,
        logo: data.logo,
        rating: parseInt(data.rating) || 0,
        ratingText: data.ratingText,
        image: data.image,
        subject: data.subject,
      };

      // Send the review data to the server
      const response = await fetch(
        "https://colleges-connectserver.vercel.app/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Review posted successfully!", responseData);

        // Optionally, you can show a success message to the user using Swal or other methods
        Swal.fire({
          icon: "success",
          title: "Review Posted",
          text: "Your review has been posted successfully!",
        });

        handleCloseModal();
      } else {
        throw new Error("Failed to post review.");
      }
    } catch (error) {
      console.error("Error posting review:", error);

      // Show an error message to the user using Swal or other methods
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to post review. Please try again later.",
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="grid p-2 md:p-5 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndMappedData.length > 0 ? (
          filteredAndMappedData.map((classData) => (
            <div
              key={classData._id}
              className="max-w-md mx-auto bg-cyan-900 text-white rounded-lg shadow-md overflow-hidden">
              <img
                className="object-cover w-full h-48"
                src={classData.collegeData?.collegeImg || ""}
                alt="College Logo"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold">
                  {classData.collegeName}
                </h2>
                <p className="text-lg mt-2">Address: {classData.address}</p>
                <p className="text-lg mt-2">
                  Admission Date: {classData.collegeData?.admissionDate}
                </p>
                <p className="text-lg mt-2">
                  Events: {classData.collegeData?.events}
                </p>
                <p className="text-lg mt-2">Subject : {classData.subject}</p>
                <button
                  onClick={() => handleEditProfileClick(classData._id)}
                  className="btn my-2 hover:bg-[#007E70] bg-[#007E70] text-xl rounded-lg text-white py-2 font-semibold">
                  Add Review
                </button>
                {isModalOpen && selectedCollegeId === classData._id && (
                  <div className="fixed top-10 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-cyan-900 text-black p-6 rounded-md w-96 shadow-md">
                      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex gap-4">
                          <div className="my-2">
                            <label
                              htmlFor="name"
                              className="block font-semibold">
                              Name
                            </label>
                            <Controller
                              name="name"
                              control={control}
                              defaultValue={classData.candidateName}
                              rules={{ required: "Name is required" }}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  className="w-full p-2 border rounded-md"
                                  required
                                />
                              )}
                            />
                            {errors.name && (
                              <span className="text-red-500">
                                {errors.name.message}
                              </span>
                            )}
                          </div>

                          <div className="my-2">
                            <label
                              htmlFor="university"
                              className="block font-semibold">
                              University
                            </label>
                            <Controller
                              name="university"
                              control={control}
                              defaultValue={classData?.collegeName}
                              rules={{ required: "University is required" }}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  className="w-full p-2 border rounded-md"
                                  required
                                  readOnly
                                />
                              )}
                            />
                            {errors.university && (
                              <span className="text-red-500">
                                {errors.university.message}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="my-2">
                            <label
                              htmlFor="logo"
                              className="block font-semibold">
                              College Logo URL
                            </label>
                            <Controller
                              name="logo"
                              control={control}
                              defaultValue={classData.collegeData?.logo || ""}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  className="w-full p-2 border rounded-md"
                                  required
                                  readOnly
                                />
                              )}
                            />
                          </div>
                          <div className="my-2">
                            <label
                              htmlFor="subject"
                              className="block font-semibold">
                              Subject
                            </label>
                            <Controller
                              name="subject"
                              control={control}
                              defaultValue={classData.subject}
                              rules={{ required: "Subject is required" }}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  className="w-full p-2 border rounded-md"
                                  required
                                  readOnly
                                />
                              )}
                            />
                            {errors.subject && (
                              <span className="text-red-500">
                                {errors.subject.message}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between gap-4">
                          <div className="my-2">
                            <label
                              htmlFor="rating"
                              className="block font-semibold">
                              Rating (1-5)
                            </label>
                            <Controller
                              name="rating"
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="number"
                                  className="w-full p-2 border rounded-md"
                                  min="1"
                                  max="5"
                                  required
                                />
                              )}
                            />
                          </div>
                          <div className="my-2">
                            <label
                              htmlFor="image"
                              className="block font-semibold">
                              Image URL
                            </label>
                            <Controller
                              name="image"
                              control={control}
                              defaultValue={classData.image || ""}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  className="w-full p-2 border rounded-md"
                                  required
                                  readOnly
                                />
                              )}
                            />
                            {errors.image && (
                              <span className="text-red-500">
                                {errors.image.message}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="my-2">
                          <label
                            htmlFor="ratingText"
                            className="block font-semibold">
                            Rating Text
                          </label>
                          <Controller
                            name="ratingText"
                            control={control}
                            defaultValue={"This is beautiful collage"}
                            render={({ field }) => (
                              <textarea
                                {...field}
                                type="text"
                                className="w-full p-2 border rounded-md"
                                required
                              />
                            )}
                          />
                        </div>
                        <div className="flex gap-5 justify-end mt-2">
                          <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded-md"
                            onClick={handleCloseModal}>
                            Close
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#007E70] text-white rounded-md">
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="flex justify-center items-center font-bold text-5xl">
            No college data found for the user.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyCollege;
