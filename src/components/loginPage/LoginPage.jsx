import styles from "./index.module.scss";

import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";

import Button from "../button";
import Input from "../input";
import Modal from "../modal";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [statusModal, setStatusModal] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  const handleSetUsername = (e) => setUsername(e.target.value);
  const handleSetPassword = (e) => setPassword(e.target.value);

  const buttonHandleSubmit = () => {
    switch (statusModal) {
      case "Errore":
        setIsToggled(false);
        break;
      case "Attenzione":
        setIsToggled(false);
        break;
      default:
    }
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (!result.error) {
      router.push("/");
    } else {
      setIsToggled(true);
      setStatusModal("Errore");
      setModalTitle("Errore di autenticazione");
      setModalText("Username o password errati");
    }
  };
  return (
    <div className={styles.LoginPage}>
      {isToggled && (
        <Modal
          status={statusModal}
          title={modalTitle}
          text={modalText}
          buttonHandleSubmit={buttonHandleSubmit}
        />
      )}
      <h2>Accedi alla Moveeda!</h2>
      <form className={styles.Form} onSubmit={handleSumbit}>
        <div className={styles.Box_Input}>
          <Input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleSetUsername}
            icon={<FiMail />}
            placeholder="Username"
          />
        </div>

        <div className={styles.Box_Input}>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleSetPassword}
            icon={<RiLockPasswordLine />}
            placeholder="Password"
          />
        </div>
        <Button textButton="Accedi" onClick={handleSumbit} type="submit" />
      </form>
      <p>
        Non hai un account Moveeda?? <a href="./register">Registrati</a>
      </p>
    </div>
  );
};

export default LoginPage;
