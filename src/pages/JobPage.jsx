/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import useFetch from "../hooks/useFetch";
import { getSingleJob, updateHiringStatus } from "../api/apiJobs";
import { useEffect } from "react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";

const JobPage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    fn: fnJob,
    data: job,
    loading: loadingJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  const { fn: fnHiringStatus, loading: loadingHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen);
  };

  useEffect(() => { 
    if (isLoaded) fnJob();
  }, [isLoaded]);

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-10">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        <img src={job?.company?.logo_url} className="h-12" alt={job?.title} />
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <MapPinIcon /> {job?.location}
        </div>
        <div className="flex gap-2 items-center">
          <Briefcase /> {job?.applications?.length} Applicants
        </div>
        <div className="flex gap-2 items-center">
          {job?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>

      {/* Hiring Status */}

      <h2 className="text-2xl sm:text-3xl font-bold">About the job</h2>
      <p className="sm:text-lg">{job?.description}</p>

      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>

      <MDEditor.Markdown
        source={job?.requirements}
        className="bg-transparent sm:text-lg"
      />

      {/* render applications */}
    </div>
  );
};

export default JobPage;
