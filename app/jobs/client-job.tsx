"use client";

import { Job } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import Card from "./card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ClientJob = {
  jobs: Job[];
};

const initialState = {
  title: "",
  location: "",
  salary: "",
};

const jobType = [
  {
    value: "Full-Time",
    label: "Full-Time",
  },
  {
    value: "Part-Time",
    label: "Part-Time",
  },
];

export default function ClientJob({ jobs }: ClientJob) {
  const [state, setState] = useState(initialState);
  const [value, setValue] = useState("");

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  const filteredJobs = jobs.filter((item) => {
    const salaryCondition = Number(item.salary) >= Number(state.salary);
    const titleCondition =
      state.title === "" || item.title.includes(state.title);
    const location =
      state.location === "" || item.location?.includes(state.location);
    const typeCondition = value === "" || item.type === value;

    return salaryCondition && titleCondition && location && typeCondition;
  });

  return (
    <div>
      {jobs.length >= 1 ? (
        <>
          <div className="w-full py-8 gap-y-8 container">
            {jobs.map((item) => (
              <Card
                id={item.id}
                title={item.title}
                type={item.type}
                location={item.location}
                salary={item.salary}
                desc="The best job you can find out there on market!"
                key={item.id}
                websiteUrl={item.websiteUrl}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center gap-8 mt-12">
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <h1 className="mt-8 text-xl font-bold">No jobs found</h1>
              <p className="max-w-xl mx-auto text-base my-2 lg:text-sm text-secondary-foreground">
                Start creating jobs and it will appear here
              </p>
            </div>
            <div className="flex justify-center max-w-sm mx-auto mt-4">
              <Button size="sm" className="">
                <Link href="/create-job">Create Jobs</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
