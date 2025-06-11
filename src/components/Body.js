import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter} from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import ProfileSelection from "./profiles/ProfileSelection"; // Import ProfileSelection
import ManageProfiles from "./profiles/ManageProfiles"; // Import ManageProfiles


const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/profiles/select", // New route for ProfileSelection
      element: <ProfileSelection />,
    },
    {
      path: "/profiles/manage", // New route for ManageProfiles
      element: <ManageProfiles />,
    },
  ]);
 
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
