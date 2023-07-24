import { useLocation, useNavigate } from "react-router-dom";

import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const GoogleSignIn = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleGoogleSignIn = () => {
    googleSignIn().then((res) => {
      console.log(res.user);
      const users = {
        name: res.user.displayName,
        email: res.user.email,
        photoURl: res.user.photoURL,

        address: " ",
        university: " ",
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
          if (data.insertedId) {
            Swal.fire({
              position: "top-start",
              icon: "success",
              title: "User created successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      navigate(from, { replace: true });
    });
  };

  return (
    <button
      className="flex items-center bg-black text-white py-2 rounded-md font-bold justify-center w-full  text-xl"
      onClick={handleGoogleSignIn}>
      <FaGoogle className="mr-2" />
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;
