"use client";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { JwtPayload } from "@/utils/jwt";
import Sidebar from "@/components/sidebarMenu/Sidebar";
import TopBar from "@/components/topBar/TopBar";
import withAuth from "@/hoc/withAuth";
import styles from "@/styles/style";

const Dashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt.decode(token) as JwtPayload;
      if (!decoded.isProfileSetup) {
        setShowModal(true);
      }
    } else {
      console.log("no token");
      router.push("/dashboard");
    }
  }, [router]);

  const handleProfileSetup = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    const response = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        companyName,
        companyLogo,
        websiteUrl,
      }),
    });

    if (response.ok) {
      setShowModal(false);
    } else {
      console.error("Error setting up profile:", await response.json());
    }
  };

  return (
    <div>
      {showModal && (
        <div className="z-[999] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 min-h-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full flex justify-center">
            <div className="flex flex-col gap-4 justify-center w-[30%]">
            <h2 className="text-2xl mb-4">Setup Your Account</h2>
            <form onSubmit={handleProfileSetup}>
              <div className="mb-4">
                <label className="block text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className={`${styles.inputStyle} w-full`}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Company Logo URL</label>
                <input
                  type="text"
                  name="companyLogo"
                  required
                  value={companyLogo}
                  onChange={(e) => setCompanyLogo(e.target.value)}
                  className={`${styles.inputStyle} w-full`}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Website URL</label>
                <input
                  type="url"
                  name="websiteUrl"
                  required
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className={`${styles.inputStyle} w-full`}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex">
        <Sidebar />
        <div className="ml-64 w-full">
          <TopBar />
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
