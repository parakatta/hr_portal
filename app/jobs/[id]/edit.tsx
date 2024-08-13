"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import InputWithLabel from "../input-job";
import { DropDown } from "@/components/dropdown";
import SubmitButton from "@/components/submit-button";
import { toast } from "react-hot-toast";
import { redirect, usePathname } from "next/navigation";

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
  {
    value: "Full-Time",
    label: "Full-Time",
  },
  {
    value: "Part-Time",
    label: "Part-Time",
  },
];

export default function EditJobClient() {
  const pathname = usePathname();
  const id = pathname.split("/jobs/")[1];
  const [value, setValue] = useState("");
  const [state, setState] = useState({ ...initialState, type: "" });

  useEffect(() => {
    async function fetchJob() {
      if (id) {
        try {
          const response = await fetch(`/api/jobs/${id}`);
          const jobData = await response.json();

          if (response.ok) {
            setState({
              title: jobData.title,
              websiteUrl: jobData.websiteUrl,
              location: jobData.location,
              salary: jobData.salary,
              type: jobData.type,
              description: jobData.description,
              responsibilities: jobData.responsibilities,
              requirements: jobData.requirements,
            });
            setValue(jobData.type);
          } else {
            toast.error("Job not found");
            redirect("/jobs");
          }
        } catch (error) {
          toast.error("Failed to fetch job details");
        }
      }
    }

    fetchJob();
  }, [id]);

  useEffect(() => {
    setState((prev) => ({ ...prev, type: value }));
  }, [value]);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.name]: event.target.value });
  }
  async function editJob(id: any, data: any) {
    try {
      const response = await fetch("/api/jobs/edit-job", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idd: id, data }),
      });

      if (!response.ok) {
        throw new Error("Failed to update job");
      }

      const updatedJob = await response.json();
      console.log("updated", updatedJob);
      return updatedJob;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-auto px-8 py-6 m-5 mb-[50px] border border-slate-100">
      <form
        action={async (formData) => {
          await editJob(id, state);
          toast.success("Edited Successfully");
          window.location.href = "/jobs";
        }}
        className="px-6 grid grid-cols-1 gap-12 gap-x-20"
      >
        <InputWithLabel
          type="text"
          id="title"
          placeholder="title"
          label="Job Title"
          value={state.title}
          onChange={onChange}
          name="title"
          className=""
        />

        <InputWithLabel
          type="text"
          value={state.websiteUrl}
          id="websiteUrl"
          placeholder="websiteUrl"
          label="Website URL"
          name="websiteUrl"
          onChange={onChange}
          className=""
        />

        <InputWithLabel
          type="text"
          id="location"
          placeholder="location"
          label="Location"
          value={state.location}
          onChange={onChange}
          name="location"
          className=""
        />
        <InputWithLabel
          type="text"
          value={state.salary}
          id="salary"
          placeholder="salary"
          label="Salary"
          onChange={onChange}
          name="salary"
          className=""
        />
        <input type="hidden" value={value} name="type" onChange={onChange} />
        <DropDown value={value} setValue={setValue} jobType={jobType} />
        <InputWithLabel
          type="textarea"
          value={state.description}
          id="description"
          placeholder=""
          label="Description"
          onChange={onChange}
          name="description"
          className="h-40 align-top"
        />
        <InputWithLabel
          type="textarea"
          value={state.responsibilities}
          id="responsibilities"
          placeholder=""
          label="Responsibility"
          onChange={onChange}
          name="responsibilities"
          className="h-[300px] align-top"
        />
        <InputWithLabel
          type="textarea"
          value={state.requirements}
          id="requirements"
          placeholder=""
          label="Requirements"
          onChange={onChange}
          name="requirements"
          className="h-[300px] align-top"
        />

        <div className="">
          <SubmitButton label="Save" variant="default" />
        </div>
      </form>
      {/* <Button variant="outline" onClick={() => window.history.back()}>
            Cancel
          </Button> */}
    </div>
  );
}
