/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@clerk/clerk-react";
import useFetch from "../hooks/useFetch";
import { getUserApplications } from "../api/apiApplications";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./ApplicationCard";
import { useEffect } from "react";

const CreatedApplications = () => {
  const { user, isLoaded } = useUser();

  const {
    fn: fnGetApplications,
    data: dataApplications,
    loading: loadingApplications,
  } = useFetch(getUserApplications, {
    user_id: user?.id,
  });

  useEffect(() => {
    if (isLoaded) {
      fnGetApplications();
    }
  }, [isLoaded]);

  if (!isLoaded || loadingApplications) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-4">
      {dataApplications && dataApplications.length ? (
        <div className="mt-8 flex flex-col gap-4">
          {dataApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              isCandidate={true}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center m-10 text-xl">
          No Applications Found 😟
        </div>
      )}
    </div>
  );
};

export default CreatedApplications;
