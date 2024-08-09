import styles from "@/styles/style";
import React, { ChangeEvent } from "react";

type Props = {
  settings: any;
  setSettings: (settings: any) => void;
  toggleModal: () => void;
};

const DesignBrandingModal: React.FC<Props> = ({
  settings,
  setSettings,
  toggleModal,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setSettings({ ...settings, [name]: files ? files[0] : value });
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white w-full h-full flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex justify-between gap-8 items-start">
            <h2 className="text-xl font-semibold p-1">Design and Branding</h2>

            <div className="">
              <button className="p-2 ">View Site</button>
            </div>
          </div>
          <div>
            <button onClick={toggleModal} className="mr-2 p-2 ">
              Cancel
            </button>
            <button onClick={toggleModal} className={styles.editButton}>
              Save
            </button>
          </div>
        </div>
        <div className="flex flex-grow">
          <div className="w-1/4 p-4 border-r">
            <div className="mb-4">
              <label className="block mb-2 font-semibold">
                Logo (Light Mode)
              </label>
              <input
                type="file"
                name="logoDarkMode"
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">
                Logo (Dark Mode)
              </label>
              <input
                type="file"
                name="logoDarkMode"
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Favicon Logo</label>
              <input
                type="file"
                name="faviconLogo"
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Button Color</label>
              <input
                type="color"
                name="buttonColor"
                value={settings.buttonColor}
                onChange={handleColorChange}
                className="w-20"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">
                Button Hover Color
              </label>
              <input
                type="color"
                name="buttonHoverColor"
                value={settings.buttonHoverColor}
                onChange={handleColorChange}
                className="w-20"
              />
            </div>
          </div>
          {/* <div className="flex-grow bg-gray-100">
            <div className="p-4 border-b">
              <button className="p-2 bg-blue-500 text-white rounded">
                View Site
              </button>
            </div>
            <div className="flex-grow bg-gray-200"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DesignBrandingModal;
