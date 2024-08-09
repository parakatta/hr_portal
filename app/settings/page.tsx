"use client";
import ProfileForm from "@/components/profileSettings/ProfileForm";
import Sidebar from "@/components/sidebarMenu/Sidebar";
import TopBar from "@/components/topBar/TopBar";
import styles from "@/styles/style";
import Link from "next/link";
import React from "react";
import withAuth from "@/hoc/withAuth";

function page() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 bg-white w-full">
        <TopBar />
        <div className="min-h-screen bg-white p-4">
          <h1 className={styles.pageHeading}>Settings</h1>
          <div className="mb-[80px] w-[70%] p-4">
            <ProfileForm />
          </div>
          <div className="w-1/2 my-4 gap-3 p-4">
            <div className="mb-[50px] flex flex-col gap-4">
              <h1 className={styles.thirdHeading}>Setup Custom Domain</h1>
              <p className={styles.thirdPara}>
                By mapping your own domain, customers can access HR Portal using
                careers.company.com. Follow the steps to setup custom domain
              </p>
            </div>
            <div className="flex flex-col gap-4 p-4">
              <h1 className={styles.menuHeading}>Steps: </h1>
              <p className={styles.menuName}>
                1. Create a CNAME (eg: careers) and point it to "careers.com"
              </p>
              <p className={styles.menuName}>
                2. Add the custom domains to the below field.
              </p>
              <form className="flex flex-col gap-3 my-[30px]">
                <label htmlFor="domain_name" className={styles.menuName}>
                  Custom app domain*
                </label>
                <input
                  name="domain_name"
                  className="p-1 border-[1px] border-gray-700 rounded-[5px]"
                  required
                />
              </form>
            </div>
          </div>
          <Link href="/advanced-settings">
            <p className="text-blue-500 hover:text-blue-400 text-sm">
              Advanced Settings
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withAuth(page);
