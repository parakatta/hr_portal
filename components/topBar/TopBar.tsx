import styles from "@/styles/style";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faSearch, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TopBar: React.FC = () => {
  return (
    <div className="flex justify-between items-center h-15 bg-white border-b py-1">
      <div className="flex items-center border-[1px] border-gray-300 rounded p-1 ml-2 w-[40%]">
        <FontAwesomeIcon icon={faSearch} className="h-3 w-4 mr-2" />
        <p className="text-sm text-gray-400">Search</p>
      </div>
        <div className="flex gap-3">
          <div className="flex bg-gray-100 hover:bg-gray-200 rounded p-1 m-1 gap-3 items-center">
            <FontAwesomeIcon icon={faUser} className="h-4 w-4 " />
            <h1 className="text-sm">Username</h1>
          </div>
          <div className="bg-gray-100 flex items-center px-2 py-1 mr-2 my-1 rounded border-gray-500 border-[1px]">
            <FontAwesomeIcon icon={faMoon} className="h4 w-4" />
          </div>
        </div>
    </div>
  );
};

export default TopBar;

