import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faDashboard,
  faBriefcase,
  faGear,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import styles from "@/styles/style";
import { faOpencart } from "@fortawesome/free-brands-svg-icons/faOpencart";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 border-r  flex flex-col min-h-screen  fixed top-0 left-0">
      <div className="p-4 font-bold text-2xl">HR Portal</div>
      <nav className="flex-1 px-4">
        <div className="mt-4">
          <ul>
            <li className="mt-2">
              <Link
                href="/dashboard"
                className="flex items-center py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              >
                <FontAwesomeIcon
                  icon={faDashboard}
                  className={styles.iconStyle}
                />
                Dashboard
              </Link>
            </li>
            <li className="mt-2">
              <Link legacyBehavior href="">
                <a className="flex items-center py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  <FontAwesomeIcon
                    icon={faOpencart}
                    className={styles.iconStyle}
                  />
                  View Site
                </a>
              </Link>
            </li>
            <li className="mt-2">
              <Link legacyBehavior href="/jobs">
                <a className="flex items-center py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    className={styles.iconStyle}
                  />
                  Jobs
                </a>
              </Link>
            </li>
            <li className="mt-2">
              <Link legacyBehavior href="/settings">
                <a className="flex items-center py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  <FontAwesomeIcon icon={faGear} className={styles.iconStyle} />
                  Settings
                </a>
              </Link>
            </li>
            <li className="mt-2">
              <Link legacyBehavior href="/billing">
                <a className="flex items-center py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  <FontAwesomeIcon
                    icon={faNoteSticky}
                    className={styles.iconStyle}
                  />
                  Billing
                </a>
              </Link>
            </li>
            <li className="mt-2">
              <Link legacyBehavior href="/members">
                <a className="flex items-center py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className={styles.iconStyle}
                  />
                  Members
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
