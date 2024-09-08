/* eslint-disable react/prop-types */
import { CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/clerk-react";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteJob, saveJob } from "../api/apiJobs";
import useFetch from "../hooks/useFetch";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { BarLoader } from "react-spinners";

const JobCard = ({
  job,
  previouslySaved,
  isMyJob = false,
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(previouslySaved);
  const { user } = useUser();

  const { fn: fnSavedJob, loading: loadingSavedJob } = useFetch(saveJob, {
    alreadySaved: saved,
  });

  const { fn: fnDeleteJob, loading: loadingDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const handleSaveJob = async () => {
    setSaved((prev) => !prev);
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobSaved();
  };

  if (loadingDeleteJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <Card>
      <CardHeader className="flex flex-col">
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              size={18}
              className="cursor-pointer"
              onClick={handleDeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div>
          {job.company && (
            <img
              src={job.company.logo_url}
              alt={job.company.name}
              className="h-6"
            />
          )}
          <div className="flex mt-4 items-center gap-2">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        <div className="mt-4">
          {`${job.description.substring(0, job.description.indexOf("."))}...`}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
          >
            {saved ? (
              <Heart size={20} stroke="red" fill="red" />
            ) : (
              <Heart size={20} stroke="red" />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
