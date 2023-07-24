import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLoaderData } from "react-router-dom";

const SingleColleges = () => {
  const { user } = useAuth();
  const collage = useLoaderData();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const updatedData = {
      address: data.address,
      candidateEmail: data.candidateEmail,
      candidateName: data.candidateName,
      candidatePhone: data.candidatePhone,
      image: data.image,
      collegeName: data.collegeName,
      dateOfBirth: data.dateOfBirth,
      subject: data.subject,
    };

    fetch("https://colleges-connectserver.vercel.app/classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Class Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="py-9 flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 py-6 w-full md:w-1/2 lg:w-2/3">
        <h2 className="text-2xl font-bold mb-4">Candidate Information</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              {...register("collegeName", { required: true })}
              className="w-full p-2 border rounded-md"
              placeholder="College Name"
              value={collage.collegeName}
              readOnly
            />
          </div>
          <div className="mb-4">
            <input
              {...register("candidateName", { required: true })}
              className="w-full p-2 border rounded-md"
              placeholder="Candidate Name"
              defaultValue={user.displayName}
            />
            {errors.candidateName && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <select
              {...register("subject", { required: true })}
              className="w-full p-2 border rounded-md">
              <option value="">Select a Subject</option>
              <option value="engineering">Engineering</option>
              <option value="mathematics">Mathematics</option>
              <option value="science">Science</option>
              <option value="history">History</option>
              <option value="literature">Literature</option>
              <option value="computer-science">Computer Science</option>
              <option value="music">Music</option>
            </select>
            {errors.subject && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register("candidateEmail", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
              className="w-full p-2 border rounded-md"
              placeholder="Candidate Email"
              defaultValue={user.email}
              readOnly
            />
            {errors.candidateEmail && (
              <span className="text-red-500">Invalid email format</span>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register("candidatePhone", { required: true })}
              className="w-full p-2 border rounded-md"
              placeholder="Candidate Phone number"
            />
            {errors.candidatePhone && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register("address", { required: true })}
              className="w-full p-2 border rounded-md"
              placeholder="Address"
            />
            {errors.address && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register("dateOfBirth", { required: true })}
              className="w-full p-2 border rounded-md"
              type="date"
            />
            {errors.dateOfBirth && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("image")}
              type="text"
              defaultValue={user.photoURL}
              className="w-full p-2 border rounded-md"
            />
            {errors.dateOfBirth && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <input className="w-full" />
          </div>

          <button
            type="submit"
            className="btn hover:bg-[#007E70] bg-[#007E70] text-xl rounded-lg text-white  font-semibold ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleColleges;
