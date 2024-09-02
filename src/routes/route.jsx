import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import LandingPage from "../pages/LandingPage";
import OnBoarding from "../pages/OnBoarding";
import JobListing from "../pages/JobListing";
import JobPage from "../pages/JobPage";
import PostJobs from "../pages/PostJobs";
import SavedJobs from "../pages/SavedJobs";
import MyJobs from "../pages/MyJobs";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: <OnBoarding />,
      },
      {
        path: "/jobs",
        element: <JobListing />,
      },
      {
        path: "/job/:id",
        element: <JobPage />,
      },
      {
        path: "/post-job",
        element: <PostJobs />,
      },
      {
        path: "/saved-jobs",
        element: <SavedJobs />,
      },
      {
        path: "/my-jobs",
        element: <MyJobs />,
      },
    ],
  },
]);

export default router;
