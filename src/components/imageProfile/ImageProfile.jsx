import styles from "./index.module.scss";

import { useState } from "react";

const ImageProfile = ({ onImageChange, type = "users" }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = async (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);
    const formData = new FormData();
    formData.append("file", image);

    try {
      fetch(`/api/${type}/upload`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "OK") {
            onImageChange(data.filename);
          } else {
            alert("Errore di caricamento!");
          }
        });
    } catch (error) {
      alert("Errore nella richiesta di caricamento del file");
    }
  };

  return (
    <>
      <div className={styles.Image_Profile}>
        <input
          type="file"
          name="imageProfile"
          id="imageProfile"
          accept="image"
          className={styles.Btn}
          onChange={handleImageChange}
        />
      </div>
      <div className={styles.Icon}>
        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected Image"
            className={styles.Image}
          />
        )}
      </div>
    </>
  );
};

export default ImageProfile;
