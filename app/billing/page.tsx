"use client"
import Sidebar from "@/components/sidebarMenu/Sidebar";
import TopBar from "@/components/topBar/TopBar";
import styles from "@/styles/style";
import React from "react";
import withAuth from "@/hoc/withAuth";

function Page() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 bg-white w-full">
        <TopBar />
        <div className="min-h-screen bg-white p-4">
          <h1 className={styles.pageHeading}>Billings</h1>
          </div>
      </div>
    </div>
  );
}

export default withAuth(Page);
