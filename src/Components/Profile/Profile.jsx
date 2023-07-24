import { useEffect, useState } from "react";
import {
  RiProfileFill,
  RiMailFill,
  RiBuildingFill,
  RiMapPinFill,
} from "react-icons/ri";
import useAuth from "../../Hooks/useAuth";
import Loader from "../Loader/Loader";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useAuth();
  const email = user?.email;

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`https://colleges-connectserver.vercel.app/users/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, [email]);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEditProfileClick = () => {
    setIsModalOpen(true);
    if (userDetails) {
      // Prefill the form fields with the user details
      setValue("name", userDetails.name);
      setValue("address", userDetails.address);
      setValue("university", userDetails.university);
      setValue("photoURl", userDetails.photoURl);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        name: data.name,
        address: data.address,
        university: data.university,
        photoURl: data.photoURl,
      };
      console.log(updatedData);

      const response = await fetch(
        `https://colleges-connectserver.vercel.app/updateData/${email}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        // Update the user details locally if the server update is successful
        setUserDetails((prevUser) => ({
          ...prevUser,
          name: data.name,
          address: data.address,
          university: data.university,
          photoURl: data.photoURl,
        }));

        // Show the SweetAlert2 success message
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile has been updated successfully.",
          timer: 3000, // The alert will automatically close after 3 seconds
          timerProgressBar: true,
          showConfirmButton: false,
        });

        // Close the modal after submission
        setIsModalOpen(false);
      } else {
        console.error("Failed to update user details.");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="w-full px-5">
        <div className="w-full flex flex-col md:flex-row my-9 border-slate-200 rounded-md p-4 border-2 shadow-md justify-between items-center px-10">
          <img
            className="rounded-full h-80 mb-4 md:mb-0 md:mr-6"
            src={userDetails?.photoURl}
            alt="Profile"
          />

          <div>
            <h1 className="text-center text-3xl font-bold">Profile Info</h1>

            <div className="flex gap-3 items-center my-4">
              <RiProfileFill className="text-[#007E70] text-2xl" />
              <h2 className="font-bold text-xl">Name: {userDetails?.name}</h2>
            </div>
            <div className="flex gap-3 items-center my-4">
              <RiMailFill className="text-[#007E70] text-2xl" />
              <h2 className="font-bold text-xl">Email: {userDetails?.email}</h2>
            </div>
            {userDetails && (
              <>
                <div className="flex gap-3 items-center my-4">
                  <RiMapPinFill className="text-[#007E70] text-2xl" />
                  <h2 className="font-bold text-xl">
                    Address: {userDetails?.address}
                  </h2>
                </div>
                <div className="flex gap-3 items-center my-4">
                  <RiBuildingFill className="text-[#007E70] text-2xl" />
                  <h2 className="font-bold text-xl">
                    University: {userDetails?.university}
                  </h2>
                </div>
              </>
            )}
          </div>
          <button
            className="bg-[#007E70] py-2 px-4 rounded-md font-semibold text-2xl text-white my-auto"
            onClick={handleEditProfileClick}>
            Edit Profile
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-10 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-96 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-4">
                <label htmlFor="name" className="block font-semibold">
                  Name
                </label>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={userDetails.name}
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
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>
              <div className="my-4">
                <label htmlFor="photo" className="block font-semibold">
                  Profile Photo
                </label>
                <Controller
                  name="photoURl"
                  defaultValue={userDetails?.photoURl}
                  control={control}
                  rules={{ required: "Profile Photo is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  )}
                />
                {errors.photoURl && (
                  <span className="text-red-500">
                    {errors.photoURl.message}
                  </span>
                )}
              </div>
              <div className="my-4">
                <label htmlFor="address" className="block font-semibold">
                  Address
                </label>
                <Controller
                  name="address"
                  control={control}
                  defaultValue={userDetails.address}
                  rules={{ required: "Address is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  )}
                />
                {errors.address && (
                  <span className="text-red-500">{errors.address.message}</span>
                )}
              </div>

              <div className="my-4">
                <label htmlFor="university" className="block font-semibold">
                  University
                </label>
                <Controller
                  name="university"
                  control={control}
                  defaultValue={userDetails.university}
                  rules={{ required: "University is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  )}
                />
                {errors.university && (
                  <span className="text-red-500">
                    {errors.university.message}
                  </span>
                )}
              </div>

              <div className="flex gap-5 justify-end mt-4">
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
  );
};

export default Profile;
