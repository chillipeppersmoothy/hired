/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@clerk/clerk-react";
import useFetch from "../hooks/useFetch";
import { getSavedJobs } from "../api/apiJobs";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";
import JobCard from "../components/JobCard";

const SavedJobs = () => {
  const { isLoaded } = useUser();

  const {
    fn: fnSavedJobs,
    data: savedJobs,
    loading: loadingSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isLoaded) {
      fnSavedJobs();
    }
  }, [isLoaded]);

  if (!isLoaded || loadingSavedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h1>

      {loadingSavedJobs === false && (
        <>
          {savedJobs && savedJobs.length ? (
            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedJobs.map((savedJob) => (
                <JobCard
                  key={savedJob?.id}
                  job={savedJob?.job}
                  previouslySaved={true}
                  onJobSaved={fnSavedJobs}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center m-10 text-xl">
              No Saved Jobs Found 👀
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SavedJobs;
