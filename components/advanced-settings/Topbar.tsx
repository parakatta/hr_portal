"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const TopBar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className="flex justify-between items-center p-4 border-b text-black">
      <div className="text-lg font-medium ml-64">Advanced Settings</div>
      <div className="flex items-center">
        <button onClick={toggleDarkMode} className="mr-4">
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </button>
        <FontAwesomeIcon icon={faUserCircle} className="text-2xl" />
      </div>
    </div>
  );
};

export default TopBar;
