"use client";
import Sidebar from "@/components/sidebarMenu/Sidebar";
import TopBar from "@/components/topBar/TopBar";
import styles from "@/styles/style";
import React, { useEffect, useState } from "react";
import ClientJob from "./client-job";
import withAuth from "@/hoc/withAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

function Page() {
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      return;
    }
    try {
      const response = await fetch("/api/jobs/get-jobs", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const jobsData = await response.json();
        setJobs(jobsData);
      } else {
        console.error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <TopBar />
        <div className="min-h-screen p-4">
          <div className="flex justify-between">
            <h1 className={styles.pageHeading}>Jobs</h1>
            <Button size="sm" className="">
              <FontAwesomeIcon icon={faAdd} className="mr-2" />
              <Link href="/create-job">Create Jobs</Link>
            </Button>
          </div>
          <ClientJob jobs={jobs} />
        </div>
      </div>
    </div>
  );
}

export default withAuth(Page);
