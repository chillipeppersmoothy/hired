/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import useFetch from "../hooks/useFetch";
import { getSingleJob, updateHiringStatus } from "../api/apiJobs";
import { useEffect } from "react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApplyJob from "../components/ApplyJob";
import ApplicationCard from "../components/ApplicationCard";

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
    fnJob();
  };

  const isCandidate = job?.applications?.some(
    (application) => application.candidate_id === user?.id
  );

  const isRecruiter = job?.recruiter_id === user?.id;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isLoaded) fnJob();
  }, [isLoaded]);

  if (!isLoaded || loadingJob || loadingHiringStatus) {
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
        {isRecruiter && (
          <div className="flex gap-2 items-center">
            <Briefcase /> {job?.applications?.length} Applicants
          </div>
        )}
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

      {isRecruiter && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${job?.isOpen ? "bg-green-950" : "bg-red-950"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " + (job?.isOpen ? "(Open)" : "(Closed)")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold">About the job</h2>
      <p className="sm:text-lg">{job?.description}</p>

      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>

      <MDEditor.Markdown
        source={job?.requirements}
        className="bg-transparent sm:text-lg p-2 rounded-lg"
      />

      {!isRecruiter && (
        <ApplyJob
          user={user}
          job={job}
          applied={job?.applications?.find(
            (application) => application.candidate_id === user.id
          )}
          fetchJob={fnJob}
        />
      )}

      {job?.applications?.length > 0 && (isRecruiter || isCandidate) && (
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold mb-5">Applications</h2>
          {job?.applications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              isCandidate={isCandidate}
              job={job}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPage;
