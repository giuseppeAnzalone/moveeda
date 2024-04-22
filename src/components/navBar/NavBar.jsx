import styles from "./index.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  FaHouse,
  FaTicket,
  FaMagnifyingGlass,
  FaCircleUser,
  FaSquarePlus,
  FaTableList,
  FaQuestion,
} from "react-icons/fa6";

import { RiLoginBoxFill } from "react-icons/ri";

const NavBar = ({ userType }) => {
  const router = useRouter();

  return (
    <nav className={styles.NavBar}>
      <ul className={styles.NavMenu}>
        <li>
          <Link
            className={
              router.pathname === "/"
                ? styles.Active
                : router.pathname.includes("/event")
                ? styles.Active
                : ""
            }
            href="/"
          >
            <FaHouse />
          </Link>
        </li>
        <li>
          <Link
            className={router.pathname === "/search" ? styles.Active : ""}
            href="/search"
          >
            <FaMagnifyingGlass />
          </Link>
        </li>
        {userType !== undefined ? (
          <>
            {userType === "business" ? (
              <li>
                <Link
                  href="/add"
                  className={router.pathname === "/add" ? styles.Active : ""}
                >
                  <FaSquarePlus />
                </Link>
              </li>
            ) : (
              <></>
            )}
            <li>
              <Link
                className={
                  router.pathname === "/myTickets"
                    ? styles.Active
                    : router.pathname.includes("/ticket")
                    ? styles.Active
                    : ""
                }
                href="/myTickets"
              >
                <FaTicket />
              </Link>
            </li>
            {userType === "business" ? (
              <li>
                <Link
                  href="/myEvents"
                  className={
                    router.pathname === "/myEvents" ? styles.Active : ""
                  }
                >
                  <FaTableList />
                </Link>
              </li>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        <li>
          {userType ? (
            <Link
              className={router.pathname === `/profile` ? styles.Active : ""}
              href={`/profile`}
            >
              <FaCircleUser />
            </Link>
          ) : (
            <Link
              className={router.pathname === "/login" ? styles.Active : ""}
              href="/login"
            >
              <RiLoginBoxFill />
            </Link>
          )}
        </li>
        <li>
          <Link href="/about">
            <FaQuestion />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
