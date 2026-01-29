import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Home } from "./Pages/Home";
import { Memories } from "./Pages/Memories";
import { About } from "./Pages/About";
import { Members } from "./Pages/Members"; // ✅ import Members page
import Navbar from "./navbar/navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

// Layout with Navbar + nested pages
const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to="/home" replace /> },
        { path: "home", element: <Home /> },
        { path: "memories", element: <Memories /> },
        { path: "about", element: <About /> },
        { path: "members", element: <Members /> }, 
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
