import styles from "./index.module.scss";
import Button from "../button";
import { useState, useEffect } from "react";
import { FaAngellist } from "react-icons/fa";
import { TiWarningOutline } from "react-icons/ti";
import { PiSmileySad } from "react-icons/pi";
import { BsChatDots } from "react-icons/bs";

const Modal = ({
  status,
  title,
  text,
  textButton = "OK",
  buttonHandleSubmit,
}) => {

  const [icon, setIcon] = useState(null);

  useEffect(() => {
    switch (status) {
      case "Errore":
        setIcon(< PiSmileySad size={30} />);
        break;
      case "Successo":
        setIcon(<FaAngellist size={30} />);
        break;
        case "Attenzione":
        setIcon(<TiWarningOutline size={30} />);
      default:
        setIcon(<BsChatDots size={30} />);
        break;
    }
    
  }, [status]); 

  return (
    <div className={styles.Modal}>
      <div className={styles.Inner}>
        <h3>
         {icon}
        </h3>
        <div className={styles.message}>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
        <Button
          textButton={textButton}
          onClick={buttonHandleSubmit}
    
        />
      </div>
    </div>
  );
};

export default Modal;
