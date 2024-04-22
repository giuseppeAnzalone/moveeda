import styles from "../../styles/Profile.module.scss";
import { useState, useEffect } from "react";
import { getSession, signOut } from "next-auth/react";
import { HTTP_GET } from "../../../libs/HTTP";

import Header from "../../components/header";
import NavBar from "../../components/navBar";
import Button from "../../components/button";
import Loader from "../../components/loader";
import Footer from "../../components/footer";
import { useRouter } from "next/router";

export default function User({ session }) {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!session) router.push("/login");

    const fetchUserData = async () => {
      try {
        const fetchedUserData = await HTTP_GET(`users/${session.user.id}`);
        setUserData(fetchedUserData.data);
      } catch (error) {
        console.error("Errore durante il recupero dei dati utente:", error);
      }
    };
    fetchUserData();
  }, [session]);

  const logout = () => {
    signOut();
    router.push("/login");
  };

  if (!userData) {
    return <Loader />;
  }

  return (
    <>
      <Header userType={session?.user?.type} />
      <div className={styles.UserWrapper}>
        <div className={styles.UserBanner}>
          <img src="/userBanner.jpg" alt="banner" />
        </div>
        <div className={styles.UserPage}>
          <div className={styles.User}>
            <img src={`user/${userData.imageProfile}`} alt="user" />
            <h1>{userData.username}</h1>
          </div>
          <div className={styles.User_Info}>
            <h1 className={styles.Type}>I miei dati </h1>
            <div className={styles.Name_Surname}>
              <div className={styles.Info}>
                <p>NOME</p>
                <h2>{userData.name}</h2>{" "}
              </div>
              <div className={styles.Info}>
                <p>COGNOME</p> <h2>{userData.surname}</h2>
              </div>
            </div>
            <div className={styles.Name_Surname}>
              <div className={styles.Info}>
                <p>CITTA'</p> <h2>{userData.city}</h2>
              </div>
            </div>
            <div className={styles.Name_Surname}>
              <div className={styles.Info}>
                <p>INDIRIZZO</p>
                <h3>{userData.address}</h3>{" "}
              </div>
            </div>
            <div className={styles.Name_Surname}>
              <div className={styles.Info}>
                <p>TELEFONO</p>
                <h3>{userData.phoneNumber}</h3>{" "}
              </div>
            </div>
            <div className={styles.Name_Surname}>
              <div className={styles.Info}>
                <p>EMAIL</p>
                <h3>{userData.email}</h3>{" "}
              </div>
            </div>
            <div className={styles.Name_Surname}>
              <div className={styles.Info}>
                <p>TIPO</p>{" "}
                <h2 className={styles.Type}>{userData.type.toUpperCase()}</h2>
              </div>
            </div>
            <div className={styles.Name_Surname}>
              <div className={styles.Info}>
                <Button
                  onClick={logout}
                  textButton="Esci"
                  typeBtn="dangerous"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <NavBar userType={session.user.type} />
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
