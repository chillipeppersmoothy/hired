/* eslint-disable react-hooks/exhaustive-deps */
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { getCompanies } from "../api/apiCompanies";
import { getJobs } from "../api/apiJobs";
import useFetch from "../hooks/useFetch";

const JobListing = () => {
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoaded, user } = useUser();
  const [query] = useSearchParams();
  let [startIndex = "1", endIndex = "6"] = query.getAll("job");
  const navigate = useNavigate();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });

  const { fn: fnCompanies, data: companiesData } = useFetch(getCompanies);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");

    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setLocation("");
    setCompany_id("");
    setSearchQuery("");
    navigate(`/jobs?job=${startIndex}&job=${endIndex}`, { replace: "true" });
  };

  const handlePrevIndex = () => {
    if (startIndex === "13") {
      navigate("/jobs?job=7&job=12");
    } else {
      navigate("/jobs?job=1&job=6");
    }
  };

  const handleNextIndex = () => {
    if (startIndex === "1") {
      navigate("/jobs?job=7&job=12");
    } else if (startIndex === "7") {
      navigate("/jobs?job=13&job=18");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fnCompanies();
    navigate("/jobs?job=1&job=6");
  }, []);

  useEffect(() => {
    fnJobs(startIndex - 1, endIndex - 1);
    if (location || company_id || searchQuery.length) {
      navigate("/jobs", { replace: "true" });
    }
  }, [isLoaded, location, company_id, searchQuery, startIndex, endIndex]);

  if (!isLoaded || loadingJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      <form
        onSubmit={handleSearch}
        className="h-14 flex w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search jobs by title..."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        ></Input>
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select
          value={location}
          onValueChange={(value) => setLocation(value)}
          className="w-auto"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN")?.map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companiesData?.length &&
                companiesData.map(({ name, id }) => (
                  <SelectItem key={id} value={id}>
                    {name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          variant="destructive"
          className="sm:w-1/2"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>

      {loadingJobs && (
        <BarLoader className="mb-4 mt-2" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        <>
          {jobs && jobs.length ? (
            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isMyJob={job.recruiter_id === user.id}
                  previouslySaved={job?.saved?.length > 0}
                  onJobSaved={fnJobs}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center m-10 text-xl">
              No Jobs Found 😟
            </div>
          )}
        </>
      )}
      <Pagination className="mt-10">
        <PaginationContent>
          {startIndex !== "1" && endIndex !== "6" && (
            <PaginationItem>
              <PaginationPrevious onClick={handlePrevIndex} />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink
              linkTo={`/jobs?job=1&job=6`}
              isActive={startIndex === "1" && endIndex === "6"}
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              linkTo={"/jobs?job=7&job=12"}
              isActive={startIndex === "7" && endIndex === "12"}
            >
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              linkTo={"/jobs?job=13&job=18"}
              isActive={startIndex === "13" && endIndex === "18"}
            >
              3
            </PaginationLink>
          </PaginationItem>
          {startIndex !== "13" && endIndex !== "18" && (
            <PaginationItem>
              <PaginationNext onClick={handleNextIndex} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default JobListing;
