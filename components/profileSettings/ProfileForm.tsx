"use client";
import styles from "@/styles/style";
import { useState, useEffect } from "react";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    companyLogo: "",
    websiteUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await fetch("/api/profile-settings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({
          fullName: data.fullName,
          email: data.email,
          companyName: data.companyName,
          companyLogo: data.companyLogo,
          websiteUrl: data.websiteUrl,
        });
      } else {
        console.error("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("fullName", formData.fullName);
    formDataToSubmit.append("companyName", formData.companyName);
    formDataToSubmit.append("websiteUrl", formData.websiteUrl);

    if (formData.companyLogo) {
      formDataToSubmit.append("companyLogo", formData.companyLogo);
    }

    const response = await fetch("/api/profile-settings", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataToSubmit,
    });

    if (response.ok) {
      setIsEditing(false);
      // Optionally, you could refetch the profile here
    } else {
      console.error("Failed to update profile");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form>
        <div className="flex justify-between">
          <h1 className={styles.thirdHeading}>Profile</h1>
          {isEditing ? (
            <button
              type="button"
              onClick={handleSave}
              className={styles.editButton}
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className={styles.editButton}
            >
              Edit
            </button>
          )}
        </div>
        <p className={`${styles.thirdPara} mb-8`}>
          Change your profile settings here. Don’t forget to save!
        </p>
        <div className="flex flex-col gap-2 my-3 px-3 py-2">
          <label className={styles.menuName}>Full Name</label>
          <input
            className={styles.inputStyle}
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-col gap-2 my-3 px-3 py-2">
          <label className={styles.menuName}>Email</label>
          <input
            className={styles.inputStyle}
            type="email"
            name="email"
            value={formData.email}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2 my-3 px-3 py-2">
          <label className={styles.menuName}>Company Name</label>
          <input
            className={styles.inputStyle}
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-col gap-2 my-3 px-3 py-2">
          <label className={styles.menuName}>Website URL</label>
          <input
            className={styles.inputStyle}
            type="url"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-col gap-2 my-3 px-3 py-2">
          <label className={styles.menuName}>Company Logo</label>
          <input
            className={styles.inputStyle}
            type="file"
            name="companyLogo"
            onChange={(e) =>
              setFormData({ ...formData, companyLogo: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>
      </form>
    </div>
  );
}
