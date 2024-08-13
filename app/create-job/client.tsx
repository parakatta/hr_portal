"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import InputWithLabel from "../jobs/input-job";
import { DropDown } from "@/components/dropdown";
import SubmitButton from "@/components/submit-button";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

const initialState = {
  title: "",
  websiteUrl: "",
  location: "",
  salary: "",
  type: "",
  description: "",
  responsibilities: "",
  requirements: "",
};

const jobType = [
  { value: "Full-Time", label: "Full-Time" },
  { value: "Part-Time", label: "Part-Time" },
];

export default function CreateJobClient() {
  const [value, setValue] = useState("");
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState((prev) => ({ ...prev, type: value }));
  }, [value]);

  function onChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  const createJobs = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const response = await fetch("/api/jobs/create-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(state),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Job created successfully!");
        redirect("/jobs");
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error creating job:", error);
      //toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="w-auto px-8 py-6 m-5 mb-[50px] border border-slate-100">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createJobs();
        }}
        className="px-6 grid grid-cols-1 gap-12 gap-x-20"
      >
        <InputWithLabel
          type="text"
          id="title"
          placeholder="Title"
          label="Job Title"
          value={state.title}
          onChange={onChange}
          name="title"
          className=""
        />

        <InputWithLabel
          type="text"
          id="websiteUrl"
          placeholder="Website URL"
          label="Website URL"
          value={state.websiteUrl}
          onChange={onChange}
          name="websiteUrl"
          className=""
        />
        <InputWithLabel
          type="text"
          id="location"
          placeholder="Location"
          label="Location"
          value={state.location}
          onChange={onChange}
          name="location"
          className=""
        />
        <InputWithLabel
          type="text"
          id="salary"
          placeholder="Salary"
          label="Salary"
          value={state.salary}
          onChange={onChange}
          name="salary"
          className=""
        />
        <input type="hidden" value={value} name="type" onChange={onChange} />
        <DropDown value={value} setValue={setValue} jobType={jobType} />
        <InputWithLabel
          type="textarea"
          id="description"
          placeholder="Description"
          label="Description"
          value={state.description}
          onChange={onChange}
          name="description"
          className="h-40 align-top"
        />
        <InputWithLabel
          type="textarea"
          id="responsibilities"
          placeholder="Responsibility"
          label="Responsibility"
          value={state.responsibilities}
          onChange={onChange}
          name="responsibilities"
          className="h-[300px] align-top"
        />
        <InputWithLabel
          type="textarea"
          id="requirements"
          placeholder="Requirements"
          label="Requirements"
          value={state.requirements}
          onChange={onChange}
          name="requirements"
          className="h-[300px] align-top"
        />

        <div>
          <SubmitButton label="Create" variant="default" />
        </div>
      </form>
    </div>
  );
}
