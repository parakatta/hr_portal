import styles from "@/styles/style";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faSearch, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ThemeToggle } from "../Themetoggle";

const TopBar: React.FC = () => {
  return (
    <div className="flex justify-between items-center h-15  border-b py-1">
      <div className="flex items-center border-[1px] border-gray-300 rounded p-1 ml-2 w-[40%]">
        <FontAwesomeIcon icon={faSearch} className="h-3 w-4 mr-2" />
        <p className="text-sm text-gray-400">Search</p>
      </div>
        <div className="flex gap-3">
          <div className="flex bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded p-1 m-1 gap-3 items-center">
            <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
            <h1 className="text-sm ">Username</h1>
          </div>
          <div >
            <ThemeToggle/>
          </div>
        </div>
    </div>
  );
};

export default TopBar;

