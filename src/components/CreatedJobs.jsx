/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@clerk/clerk-react";
import useFetch from "../hooks/useFetch";
import { getMyJob } from "../api/apiJobs";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./JobCard";

const CreatedJobs = () => {
  const { user, isLoaded } = useUser();

  const {
    fn: fnGetMyJobs,
    data: dataGetMyJobs,
    loading: loadingGetMyJobs,
  } = useFetch(getMyJob, { recruiter_id: user?.id });

  useEffect(() => {
    if (isLoaded) {
      fnGetMyJobs();
    }
  }, [isLoaded]);

  if (!isLoaded || loadingGetMyJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-4">
      {dataGetMyJobs && dataGetMyJobs.length ? (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataGetMyJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isMyJob={job.recruiter_id === user.id}
              previouslySaved={job?.saved?.length > 0}
              onJobSaved={fnGetMyJobs}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center m-10 text-xl">
          No Jobs Found 😟
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;
