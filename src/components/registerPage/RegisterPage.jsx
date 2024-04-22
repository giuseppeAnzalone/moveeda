import styles from "./index.module.scss";
import { useState, useReducer } from "react";
import { HTTP_POST } from "../../../libs/HTTP";
import { useRouter } from "next/router";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaMapMarkedAlt, FaRegUser } from "react-icons/fa";
import { LiaMapPinSolid } from "react-icons/lia";
import { TiBusinessCard } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { ImMobile } from "react-icons/im";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdAddPhotoAlternate } from "react-icons/md";
import Input from "../input";
import Button from "../button";
import Modal from "../modal";
import ImageProfile from "../imageProfile";

const RegisterPage = () => {
  const [tempPass, setTempPass] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const router = useRouter();

  const handleTempPassChange = (e) => {
    setTempPass(e.target.value);
  };

  const handleImageChange = (image) => {
    setUploadedFile(image);
    handleFieldChange("imageProfile", image);
  };

  const formReducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.field]: action.value };
    }
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    email: "",
    password: "",
    type: "user",
    username: "",
    businessName: "",
    name: "",
    surname: "",
    imageProfile: "",
    city: "",
    address: "",
    phoneNumber: "",
  });

  const handleFieldChange = (field, value) => {
    dispatchFormState({ type: "SET_FIELD", field, value });
  };

  const handleConfirmPassword = (confPass) => {
    if (tempPass === confPass) {
      handleFieldChange("password", tempPass);
    } else {
      handleFieldChange("password", "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    formState.type = formState.type.toLowerCase();
    formState.imageProfile = uploadedFile;
    const res = await HTTP_POST(`users/`, formState);
    if (res.status === "OK") {
      setShowModal(true);
      setModalStatus("Successo");
      setModalTitle("Registrazione avvenuta con successo!");
      setModalText("Ora puoi effettuare il login!");
      router.push("/login");
    } else {
      setShowModal(true);
      setModalStatus("Errore");
      setModalTitle("Qualcosa è andato storto!");
      setModalText("Tutti i campi sono obbligatori, riprova!");
    }
  };

  const buttonHandleSumbit = () => {
    switch (modalStatus) {
      case "Successo":
        router.push("/login");
        break;
      case "Errore":
        setShowModal(false);
        break;
      case "Attenzione!":
        setShowModal(false);
        break;
      default:
    }
  };

  return (
    <div className={styles.RegisterPage}>
      <div className={styles.RegisterWrapper}>
        <div className={styles.RegisterBanner}>
          <img src="/registerBanner.jpg" alt="" />
        </div>
        <div className={styles.RegisterForm}>
          <h1>Registrati a Moveeda!</h1>

          <form className={styles.Form} onSubmit={handleSubmit}>
            <label htmlFor="type">Vuoi partecipare o creare eventi?</label>
            <div className={styles.Box_Input}>
              <select
                name="type"
                id=""
                className={styles.Select}
                onChange={(e) => {
                  handleFieldChange("type", e.target.selectedOptions[0].label);
                }}
              >
                <option value={formState.type} className={styles.Option}>
                  User
                </option>
                <option value={formState.type} className={styles.Option}>
                  Business
                </option>
              </select>
            </div>

            <div className={styles.Box_Input}>
              <Input
                placeholder="Username"
                type="text"
                value={formState.username}
                onChange={(e) => {
                  handleFieldChange("username", e.target.value);
                }}
                icon={<FaRegUser />}
              />
            </div>
            {formState.type === "Business" ? (
              <>
                <div className={styles.Box_Input}>
                  <Input
                    placeholder="Business username"
                    type="text"
                    value={formState.businessName}
                    onChange={(e) => {
                      handleFieldChange("businessName", e.target.value);
                    }}
                    icon={<TiBusinessCard />}
                  />
                </div>
              </>
            ) : (
              <></>
            )}

            <div className={styles.Box_Input}>
              <Input
                placeholder="Email"
                type="text"
                value={formState.email}
                onChange={(e) => {
                  handleFieldChange("email", e.target.value);
                }}
                icon={<FiMail />}
              />
            </div>

            <div className={styles.Box_Input}>
              <Input
                placeholder="Password"
                type="password"
                value={tempPass}
                onChange={handleTempPassChange}
                icon={<RiLockPasswordLine />}
              />
            </div>

            <div className={styles.Box_Input}>
              <Input
                placeholder="Conferma password"
                type="password"
                icon={<RiLockPasswordLine />}
                onChange={(e) => {
                  handleConfirmPassword(e.target.value);
                }}
              />
            </div>

            {tempPass !== formState.password && (
              <p>Le password devono corrispondere. Riprova</p>
            )}

            <div className={styles.Box_Input}>
              <Input
                placeholder="Nome"
                type="text"
                value={formState.name}
                onChange={(e) => {
                  handleFieldChange("name", e.target.value);
                }}
                icon={<MdDriveFileRenameOutline />}
              />
            </div>

            <div className={styles.Box_Input}>
              <Input
                placeholder="Cognome"
                type="text"
                value={formState.surname}
                onChange={(e) => {
                  handleFieldChange("surname", e.target.value);
                }}
                icon={<MdDriveFileRenameOutline />}
              />
            </div>

            <div className={styles.ImagePreview}>
              <ImageProfile
                onImageChange={handleImageChange}
                icon={<MdAddPhotoAlternate />}
              />
            </div>

            <div className={styles.Box_Input}>
              <Input
                placeholder="Città"
                type="text"
                value={formState.city}
                onChange={(e) => {
                  handleFieldChange("city", e.target.value);
                }}
                icon={<FaMapMarkedAlt />}
              />
            </div>

            <div className={styles.Box_Input}>
              <Input
                placeholder="Indirizzo"
                type="text"
                value={formState.address}
                onChange={(e) => {
                  handleFieldChange("address", e.target.value);
                }}
                icon={<LiaMapPinSolid />}
              />
            </div>

            <div className={styles.Box_Input}>
              <Input
                placeholder="Cellulare"
                type="text"
                value={formState.phoneNumber}
                onChange={(e) => {
                  handleFieldChange("phoneNumber", e.target.value);
                }}
                icon={<ImMobile />}
              />
            </div>
            <Button
              textButton="Registrati"
              onClick={handleSubmit}
              type="submit"
            />
          </form>
        </div>
      </div>

      {showModal && (
        <Modal
          status={modalStatus}
          title={modalTitle}
          text={modalText}
          textButton="OK"
          buttonHandleSubmit={buttonHandleSumbit}
        />
      )}
    </div>
  );
};

export default RegisterPage;
