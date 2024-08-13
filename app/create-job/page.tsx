import React from "react";
import CreateJobClient from "./client";
import styles from "@/styles/style";
import TopBar from "@/components/topBar/TopBar";
import Sidebar from "@/components/sidebarMenu/Sidebar";

export default async function page() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <TopBar />
        <div className="min-h-screen p-4">
          <div className="flex justify-between">
            <h1 className={styles.pageHeading}>Create Job</h1>
          </div>
          <CreateJobClient />
        </div>
      </div>
    </div>
  );
}
