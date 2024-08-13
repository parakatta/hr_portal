"use client";

import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
type Card = {
  id: string;
  title: string;
  location: string | null;
  salary: string | null;
  type: string | null;
  desc: string;
  websiteUrl: string | null;
};

export default function Card({
  title,
  id,
  location,
  salary,
  type,
  desc,
  websiteUrl,
}: Card) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function deleteJob(formData: FormData) {
    try {
      const response = await fetch("/api/jobs/delete-job", {
        method: "DELETE",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        redirect("/jobs");
      } else {
        const error = await response.json();
        console.error("Error:", error.error);
      }
    } catch (err) {
      console.error("Request failed:", err);
    }
  }

  return (
    <div className="w-full min-h-[240px] flex flex-col p-4 border-t-2 gap-3">
      <div>
        <div className="pt-6 ml-auto flex justify-between gap-4">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setOpen(true)}>
              Delete
            </Button>
            <Button onClick={() => router.push(`/jobs/${id}`)}>Edit</Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-neutral-500 text-[15px]">
          <span>
            <a href={websiteUrl ? websiteUrl : "g"} target="_blank">
              company
            </a>
          </span>
          <span>{location}</span>
        </div>
      </div>

      <p className="text-md">{desc}</p>

      <div className="my-5 flex flex-wrap items-center gap-5">
        <span className="text-[15px] rounded-[500px] border-black border-2 px-4 py-2">
          $ {salary}
        </span>
        <span className="text-[15px] rounded-[500px]  border-black border-2 px-4 py-2 ">
          {type}
        </span>
      </div>
      {/* Confirmation Modal */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg max-w-md w-full">
          <Dialog.Title className="text-lg font-bold">
            Confirm Deletion
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-700">
            Are you sure you want to delete this job?
          </Dialog.Description>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <form
              action={async (formData) => {
                await deleteJob(formData);
                toast.success("Job deleted successfully!");
                setOpen(false);
              }}
            >
              <input type="hidden" name="jobId" value={id} id="jobId" />
              <SubmitButton label="Delete" variant="default" />
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
