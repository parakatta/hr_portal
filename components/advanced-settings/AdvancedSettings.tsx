"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { SettingsCard } from "@/styles/tw.style";
import styles from "@/styles/style";
import DesignBrandingModal from "../modals/DesignBrandingModal";
import AnnouncementBarModal from "../modals/AnnouncementBarModal";
import NavigationModal from "../modals/NavigationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type MenuItem = { text: string; url: string };
type StaffMember = { name: string; role: string };

const timezones = ["GMT", "UTC", "EST", "CST", "MST", "PST", "AKST", "HST"];
const languages = ["en", "es", "fr", "de", "zh", "ja", "ru", "ar"];

const AdvancedSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    titleId:"",
    title: "",
    description: "",
    metaId:"",
    metaTitle: "",
    metaDescription: "",
    languageId:"",
    language: "",
    timezoneId:"",
    timezone: "",
  });
  const [others, setOthers] = useState({
    logo: null,
    logoDarkMode: null,
    faviconLogo: null,
    primaryColor: "#ffffff",
    buttonColor: "#000000",
    buttonHoverColor: "#ff0000",
    menuItems: [{ text: "", url: "" }],
    announcementMessage: "",
    announcementBgColor: "#ffffff",
    announcementTextColor: "#000000",
    staffMembers: [],
    invitedEmails: ["johndoe@gmail.com"],
  });

  const [editing, setEditing] = useState({
    title: false,
    meta: false,
    language: false,
    timezone: false,
    staff: false,
  });

  const [modals, setModals] = useState({
    designBranding: false,
    announcementBar: false,
    navigation: false,
  });
  const [activeStaffTab, setActiveStaffTab] = useState("members");
  const [inviteEmail, setInviteEmail] = useState("");

  // Fetch settings from respective routes on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No authentication token found");
        return;
      }

      try {
        // Fetch title and description
        const titleRes = await fetch("/api/title", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const titleData = await titleRes.json();
        //console.log("titledata", titleData);

        // Fetch meta data
        const metaRes = await fetch("/api/metadata", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const metaData = await metaRes.json();
       // console.log("metadata", metaData);

        // Fetch language
        const languageRes = await fetch("/api/language", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const languageData = await languageRes.json();
        //console.log("lang", languageData);

        // Fetch timezone
        const timezoneRes = await fetch("/api/timezone", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const timezoneData = await timezoneRes.json();

        /* // Fetch staff members
        const staffRes = await fetch('/api/staff', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const staffData = await staffRes.json();

        // Fetch invited emails
        const invitedRes = await fetch('/api/invited', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const invitedData = await invitedRes.json(); */

        // Set all settings
        setSettings({
          titleId: titleData.id,
          title: titleData.title,
          description: titleData.description,
          metaId: metaData.id,
          metaTitle: metaData.metaTitle,
          metaDescription: metaData.metaDescription,
          languageId: languageData.id,
          language: languageData.language,
          timezoneId: timezoneData.id,
          timezone: timezoneData.timezone,
        });
        console.log(settings);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  // Helper functions to call the respective API routes
  const saveSettings = async (route: string, data: object) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await fetch(`/api/${route}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error saving settings");
      }
      console.log("Settings saved successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleEdit = (section: string) => {
    if (editing[section as keyof typeof editing]) {
      // Save settings before toggling off edit mode
      switch (section) {
        case "title":
          saveSettings("title", {
            titleId:settings.titleId,
            title: settings.title,
            description: settings.description,
          });
          break;
        case "meta":
          saveSettings("metadata", {
            metaId:settings.metaId,
            metaTitle: settings.metaTitle,
            metaDescription: settings.metaDescription,
          });
          break;
        case "language":
          saveSettings("language", { languageId:settings.languageId,language: settings.language });
          break;
        case "timezone":
          saveSettings("timezone", { timezoneId:settings.timezoneId,timezone: settings.timezone });
          break;
        /*  case "staff":
          saveSettings("staff", { staffMembers: settings.staffMembers });
          break;
        case "invited":
          saveSettings("invited", { invitedEmails: settings.invitedEmails });
          break; */
        // Add other cases as needed
        default:
          break;
      }
    }
    setEditing({
      ...editing,
      [section]: !editing[section as keyof typeof editing],
    });
  };

  const toggleModal = (modal: string) => {
    setModals({ ...modals, [modal]: !modals[modal as keyof typeof modals] });
  };

  const handleAddStaffMember = () => {
    if (inviteEmail.trim() !== "") {
      setOthers((prev) => ({
        ...prev,
        invitedEmails: [...prev.invitedEmails, inviteEmail],
      }));
      setInviteEmail("");
    }
  };

  const handleRemoveStaffMember = (index: number) => {
    setOthers((prev) => ({
      ...prev,
      staffMembers: prev.staffMembers.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveInvitedEmail = (index: number) => {
    setOthers((prev) => ({
      ...prev,
      invitedEmails: prev.invitedEmails.filter((_, i) => i !== index),
    }));
  };

  const handleInviteEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInviteEmail(e.target.value);
  };

  return (
    <div className="p-6 ml-64 bg-white">
      <button
        onClick={() => window.history.back()}
        className="flex font-medium text-sm mb-4"
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

      {/* Title and Description */}
      <h2 className="text-2xl font-bold mb-5">General Settings</h2>
      <section id="title-description" className="mb-6">
        <SettingsCard>
          <div className="flex justify-between items-start">
            <h2 className={styles.menuHeading}>Title and Description</h2>
            <button
              onClick={() => toggleEdit("title")}
              className={styles.editButton}
            >
              {editing.title ? "Save" : "Edit"}
            </button>
          </div>
          {editing.title ? (
            <>
              <label htmlFor="title" className={styles.menuName}>
                Site title
              </label>
              <input
                type="text"
                name="title"
                value={settings.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-2 border border-gray-300 rounded mb-5"
              />
              <label htmlFor="description" className={styles.menuName}>
                Site description
              </label>
              <textarea
                name="description"
                value={settings.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </>
          ) : (
            <>
              <div className="flex gap-x-[80px]">
                <div>
                  <p className={styles.menuName}>Site title</p>
                  <p>{settings.title}</p>
                </div>
                <div>
                  <p className={styles.menuName}>Site description</p>
                  <p>{settings.description}</p>
                </div>
              </div>
            </>
          )}
        </SettingsCard>
      </section>

      {/* Meta Data */}
      <section id="meta-data" className="mb-6">
        <SettingsCard>
          <div className="flex justify-between items-start">
            <h2 className={styles.menuHeading}>Meta Data</h2>
            <button
              onClick={() => toggleEdit("meta")}
              className={styles.editButton}
            >
              {editing.meta ? "Save" : "Edit"}
            </button>
          </div>
          {editing.meta ? (
            <>
              <label htmlFor="metaTitle" className={styles.menuName}>
                Meta Title
              </label>
              <input
                type="text"
                name="metaTitle"
                value={settings.metaTitle}
                onChange={handleChange}
                placeholder="Meta Title"
                className="w-full p-2 border border-gray-300 rounded mb-5"
              />
              <label htmlFor="metaDescription" className={styles.menuName}>
                Meta Description
              </label>
              <textarea
                name="metaDescription"
                value={settings.metaDescription}
                onChange={handleChange}
                placeholder="Meta Description"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </>
          ) : (
            <>
              <div className="flex gap-x-[80px]">
                <div>
                  <p className={styles.menuName}>Meta Title</p>
                  <p>{settings.metaTitle}</p>
                </div>
                <div>
                  <p className={styles.menuName}>Meta Description</p>
                  <p>{settings.metaDescription}</p>
                </div>
              </div>
            </>
          )}
        </SettingsCard>
      </section>

      {/* Publication Language */}
      <section id="publication-language" className="mb-6">
        <SettingsCard>
          <div className="flex justify-between items-start">
            <h2 className={styles.menuHeading}>Publication Language</h2>
            <button
              onClick={() => toggleEdit("language")}
              className={styles.editButton}
            >
              {editing.language ? "Save" : "Edit"}
            </button>
          </div>
          {editing.language ? (
            <>
              <label htmlFor="language" className={styles.menuName}>
                Site Language
              </label>
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang} className="p-5">
                    {lang}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <div>
              <p className={styles.menuName}>Site Language</p>
              <p>{settings.language}</p>
            </div>
          )}
        </SettingsCard>
      </section>

      {/* Timezone */}
      <section id="timezone" className="mb-6">
        <SettingsCard>
          <div className="flex justify-between items-start">
            <h2 className={styles.menuHeading}>Timezone</h2>
            <button
              onClick={() => toggleEdit("timezone")}
              className={styles.editButton}
            >
              {editing.timezone ? "Save" : "Edit"}
            </button>
          </div>
          {editing.timezone ? (
            <>
              <label htmlFor="timezone" className={styles.menuName}>
                Site timezone
              </label>
              <select
                name="timezone"
                value={settings.timezone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <div>
              <p className={styles.menuName}>Site timezone</p>
              <p>{settings.timezone}</p>
            </div>
          )}
        </SettingsCard>
      </section>

      {/* Staff */}
      <section id="staff" className="mb-6">
        <SettingsCard>
          <div className="flex justify-between items-start mb-3">
            <h2 className={styles.menuHeading}>Staff</h2>
            <button
              onClick={() => toggleEdit("staff")}
              className={styles.customizeButton}
            >
              Invite people
            </button>
          </div>
          <div className="flex mb-4">
            <button
              onClick={() => setActiveStaffTab("members")}
              className={`p-2 mr-2 ${styles.menuName} ${
                activeStaffTab === "members" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              Members
            </button>
            <button
              onClick={() => setActiveStaffTab("invited")}
              className={`p-2 ${styles.menuName} ${
                activeStaffTab === "invited" ? "border-b-2 border-blue-500" : ""
              }`}
            >
              Invited
            </button>
          </div>
          {activeStaffTab === "members" ? (
            <div className="">
              {others.staffMembers.length === 0 ? (
                <p className="text-center text-gray-500">No members found</p>
              ) : (
                others.staffMembers.map((member: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <p>{member}</p>
                    <button
                      onClick={() => handleRemoveStaffMember(index)}
                      className="p-2 bg-red-500 text-white rounded"
                    >
                      <FontAwesomeIcon icon={faTrash} className="p-2" />
                    </button>
                  </div>
                ))
              )}
              {editing.staff && (
                <div className="flex mt-4">
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={handleInviteEmailChange}
                    placeholder="Enter email to invite"
                    className="w-[84%] p-2 border border-gray-300 rounded mr-2"
                  />
                  <button
                    onClick={handleAddStaffMember}
                    className="p-2 bg-blue-500 text-white rounded"
                  >
                    Send Invite
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              {others.invitedEmails.length === 0 ? (
                <p className="text-gray-500">No invited emails found</p>
              ) : (
                others.invitedEmails.map((email: string, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <p>{email}</p>
                    <button
                      onClick={() => handleRemoveInvitedEmail(index)}
                      className="p-1 bg-red-500 text-white flex justify-center rounded"
                    >
                      <FontAwesomeIcon icon={faTrash} className="p-1" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </SettingsCard>
      </section>

      <h2 className="text-2xl font-bold mb-5">Site</h2>
      {/* Design and Branding */}
      <section id="design-branding" className="mb-6">
        <SettingsCard>
          <div className="flex justify-between items-start">
            <h2 className={styles.menuHeading}>Design and Branding</h2>
            <button
              className={styles.customizeButton}
              onClick={() => toggleModal("designBranding")}
            >
              Customize
            </button>
          </div>
        </SettingsCard>
      </section>

      {/* Navigation */}
      <section id="navigation" className="mb-6">
        <SettingsCard>
          <div className="flex justify-between items-start">
            <h2 className={styles.menuHeading}>Navigation</h2>
            <button
              className={styles.customizeButton}
              onClick={() => toggleModal("navigation")}
            >
              Customize
            </button>
          </div>
        </SettingsCard>
      </section>

      {/* Announcement Bar */}
      <section id="announcement-bar" className="mb-6">
        <SettingsCard>
          <div className="flex justify-between items-start">
            <h2 className={styles.menuHeading}>Announcement Bar</h2>
            <button
              className={styles.customizeButton}
              onClick={() => toggleModal("announcementBar")}
            >
              Customize
            </button>
          </div>
        </SettingsCard>
      </section>

      {modals.designBranding && (
        <DesignBrandingModal
          settings={settings}
          setSettings={setSettings}
          toggleModal={() => toggleModal("designBranding")}
        />
      )}

      {modals.announcementBar && (
        <AnnouncementBarModal
          settings={settings}
          setSettings={setSettings}
          toggleModal={() => toggleModal("announcementBar")}
        />
      )}

      {modals.navigation && (
        <NavigationModal
          settings={settings}
          setSettings={setSettings}
          toggleModal={() => toggleModal("navigation")}
        />
      )}
    </div>
  );
};

export default AdvancedSettings;
