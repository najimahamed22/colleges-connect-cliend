import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import GoogleSignIn from "./GoogleSignIn";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    // reset,
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        updateUserProfile(data.name, data.photoUrl)
          .then(() => {
            setUser({
              ...loggedUser,
              displayName: data.name,
              photoURl: data.photoUrl,
            });
            const users = {
              name: data.name,
              email: data.email,
              address: data.address,
              university: data.university,
              photoURl: data.photoUrl,
            };
            console.log(users);
            fetch("https://colleges-connectserver.vercel.app/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(users),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data.insertedId) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              });

            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            // Handle error while updating user profile
          });
      })
      .catch((error) => {
        console.log(error);
        // Handle error while creating user
      });
  };

  return (
    <>
      <h3 className="text-4xl text-center my-8 font-bold text-[#007E70]">
        Sign Up Form
      </h3>
      <div className="md:px-24 px-2">
        <form
          className="bg-cyan-900 shadow-md rounded px-8 pt-6 pb-8 mb-4  w-full"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">Name is required</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="photoUrl">
              Photo URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="photoUrl"
              type="text"
              placeholder="Enter your photo URL"
              {...register("photoUrl")}
            />
            {errors.photoUrl && (
              <p className="text-red-500 text-xs italic">
                Photo URL is required
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">Email is required</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="university">
              University
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="university"
              type="text"
              placeholder="Enter your university"
              {...register("university", { required: true })}
            />
            {errors.university && (
              <p className="text-red-500 text-xs italic">
                University is required
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="address">
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Enter your address"
              {...register("address", { required: true })}
            />
            {errors.address && (
              <p className="text-red-500 text-xs italic">Address is required</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-xs italic">
                Password is required
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-xs italic">
                Password must be at least 6 characters long
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 text-xs italic">
                Password must contain at least one capital letter and one
                special character
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs italic">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full btn hover:bg-[#007E70] bg-[#007E70] text-xl rounded-lg text-white font-semibold mt-4">
              Register
            </button>
          </div>
          <div className="my-4 text-center">
            <p className="text-xl text-white">
              Do not have an account?{" "}
              <Link to="/login" className="ps-2 font-extrabold underline">
                Login
              </Link>
            </p>
          </div>
          <GoogleSignIn />
        </form>
      </div>
    </>
  );
};

export default Register;
