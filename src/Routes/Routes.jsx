import { createBrowserRouter } from "react-router-dom";
import Main from "../Components/Main/Main";
import Profile from "../Components/Profile/Profile";
import Home from "../Components/Home/Home";
import Colleges from "../Components/Colleges/Colleges";
import CollegesDetails from "../Components/Colleges/CollegesDetails";
import Admission from "../Components/Admission/Admission";
import Register from "../Components/Register/Register";
import Login from "../Components/Register/Login";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Components/Loader/ErrorPage";
import SingleColleges from "../Components/Admission/SingleColleges";
import MyCollage from "../Components/MyCollage/MyCollage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/colleges",
        element: <Colleges></Colleges>,
      },
      {
        path: "/admission",
        element: <Admission></Admission>,
      },
      {
        path: "/mycollege",
        element: (
          <PrivateRoute>
            <MyCollage></MyCollage>
          </PrivateRoute>
        ),
      },
      {
        path: "colleges/:id",
        element: (
          <PrivateRoute>
            <CollegesDetails></CollegesDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://colleges-connectserver.vercel.app/singleCollege/${params.id}`
          ),
      },
      {
        path: "singleColleges/:id",
        element: (
          // <PrivateRoute>

          // </PrivateRoute>
          <SingleColleges></SingleColleges>
        ),
        loader: ({ params }) =>
          fetch(
            `https://colleges-connectserver.vercel.app/singleCollege/${params.id}`
          ),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);
export default router;
