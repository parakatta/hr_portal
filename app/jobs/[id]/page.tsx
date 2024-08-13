"use client";
import React from "react";
import EditJobClient from "./edit";
import styles from "@/styles/style";
import TopBar from "@/components/topBar/TopBar";
import Sidebar from "@/components/sidebarMenu/Sidebar";

export default function page() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <TopBar />
        <div className="min-h-screen p-4">
          <div className="flex flex-col justify-between">
            <button
              onClick={() => window.history.back()}
              className="flex font-medium text-sm mb-2"
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
            </button>
            <h1 className={styles.pageHeading}>Edit Jobs</h1>

            <div className="flex-1">
              <EditJobClient />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
