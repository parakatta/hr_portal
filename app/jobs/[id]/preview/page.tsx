/* import Sidebar from "@/components/admin/sidebar/sidebar";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react"; */

/* export default async function page({ params }: { params: { id: string } }) {
  const job = await prisma.jobListing.findUnique({
    where: {
      id: params.id,
    },
  });
  const responsibilities = job?.responsibility.split(/[.!?]+/);
  const requirements = job?.requirements.split(/[.!?]+/);
  return (
    <div className="flex">

      <div className="flex-1">
        <div className="container p-12 space-y-7">
          <div className="flex flex-wrap justify-between items-start">
            <div>
              <Link
                href="/admin/"
                className="flex"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="w-4 h-5 mr-2"
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
                </svg>
                Back
              </Link>
              <h1 className="text-[4rem]">{job?.title}</h1>
              <div className="flex gap-3 items-center">
                <p className="text-[1.2rem]">
                  <a href={job?.websiteUrl}>{job?.companyName}</a></p>
                <p className="bg-white text-black inline p-3 px-5 rounded-full">
                  $ {job?.salary}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                href={``}
                className="py-2 px-5 text-neutral-200 bg-zinc-800 rounded-full flex gap-2 items-center"
              >
                Apply{" "}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-4 h-4"
                  >
                    <path
                      fill="currentColor"
                      d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"
                    />
                  </svg>
                </span>
              </Link>
              <p className=" text-black flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 384 512"
                >
                  <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg>
                {job?.location}
              </p>
              <p className=" text-black flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 512 512"
                >
                  <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                </svg>
                {job?.type}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-12 w-[90%]">
            <p className="font-light text-lg sm:text-2xl dark-primary">
              {job?.desc}
            </p>
            <div>
              <h3 className="capitalize text-xl font-bold">
                Responsibilities:
              </h3>
              <ul className="text-[15px]">
                {responsibilities?.map((sentence, index) => (
                  <li key={index} className="py-2 list-disc capitalize">
                    {sentence.trim()}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="capitalize text-xl font-bold">Requirements:</h3>

              <ul className="text-[15px]">
                {requirements?.map((sentence, index) => (
                  <li key={index} className=" py-2 list-disc capitalize">
                    {sentence.trim()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} */
