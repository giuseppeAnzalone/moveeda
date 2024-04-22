import { useRouter } from "next/router";
import styles from "./index.module.scss";
import Link from "next/link";

const Menu = ({ userType }) => {
  const router = useRouter();

  return (
    <nav>
      <ul className={styles.Menu}>
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
          <li>Home</li>
        </Link>
        <Link
          className={router.pathname === "/search" ? styles.Active : ""}
          href="/search"
        >
          <li>Cerca evento</li>
        </Link>
        {userType !== undefined ? (
          <>
            {userType === "business" ? (
              <Link
                className={router.pathname === "/add" ? styles.Active : ""}
                href="/add"
              >
                <li>Aggiungi evento</li>
              </Link>
            ) : (
              <></>
            )}
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
              <li>Le mie prenotazioni</li>
            </Link>
          </>
        ) : (
          <></>
        )}

        {userType !== undefined ? (
          <>
            {userType === "business" ? (
              <Link
                href="/myEvents"
                className={router.pathname === "/myEvents" ? styles.Active : ""}
              >
                <li>I miei eventi</li>
              </Link>
            ) : (
              <></>
            )}
            <Link
              className={router.pathname === `/profile` ? styles.Active : ""}
              href={`/profile`}
            >
              <li>Profilo</li>
            </Link>
          </>
        ) : (
          <></>
        )}

        {userType === undefined ? (
          <Link
            className={router.pathname === `/login` ? styles.Active : ""}
            href={`/login`}
          >
            <li>Accedi</li>
          </Link>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
