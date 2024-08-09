import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog, faLanguage, faClock, faUsers, faPalette, faBars, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 border-r text-black flex flex-col min-h-screen fixed">
      <div className="p-4 font-bold text-2xl">HR Portal</div>
      <nav className="flex-1 px-4">
        <div className="mt-4">
          <h3 className="text-sm uppercase text-gray-400">General Settings</h3>
          <ul>
            <li className="mt-2">
              <Link legacyBehavior href="#title-description">
                <a className="flex items-center py-2 px-4 hover:bg-gray-200 rounded">
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  Title and Description
                </a>
              </Link>
            </li>
            <li className="mt-2">
              <Link legacyBehavior href="#meta-data">
                <a className="flex items-center py-2 px-4 hover:bg-gray-200 rounded">
                  <FontAwesomeIcon icon={faCog} className="mr-2" />
                  Meta Data
                </a>
              </Link>
            </li>
            <li className="mt-2">
              <Link legacyBehavior href="#publication-language">
                <a className="flex items-center py-2 px-4 hover:bg-gray-200 rounded">
                  <FontAwesomeIcon icon={faLanguage} className="mr-2" />
                  Publication Language
                </a>
              </Link>
            </li>
            <li className="mt-2">
              <Link legacyBehavior href="#timezone">
                <a className="flex items-center py-2 px-4 hover:bg-gray-200 rounded">
                  <FontAwesomeIcon icon={faClock} className="mr-2" />
                  Timezone
                </a>
              </Link>
            </li>
            <li className="mt-2">
              <Link legacyBehavior href="#staff">
                <a className="flex items-center py-2 px-4 hover:bg-gray-200 rounded">
                  <FontAwesomeIcon icon={faUsers} className="mr-2" />
                  Staff
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <h3 className="text-sm uppercase text-gray-400">Site</h3>
          <ul>
            <li className="mt-2">
              <Link legacyBehavior href="#design-branding">
                <a className="flex items-center py-2 px-4 hover:bg-gray-200 rounded">
                  <FontAwesomeIcon icon={faPalette} className="mr-2" />
                  Design and Branding
                </a>
              </Link>
            </li>
            <li className="mt-2">
              <Link legacyBehavior href="#navigation">
                <a className="flex items-center py-2 px-4 hover:bg-gray-200 rounded">
                  <FontAwesomeIcon icon={faBars} className="mr-2" />
                  Navigation
                </a>
              </Link>
            </li>
            <li className="mt-2">
              <Link legacyBehavior href="#announcement-bar">
                <a className="flex items-center py-2 px-4 hover:bg-gray-200 rounded">
                  <FontAwesomeIcon icon={faBullhorn} className="mr-2" />
                  Announcement Bar
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
