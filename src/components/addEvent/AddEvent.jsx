import styles from "./index.module.scss";

import { HTTP_POST, HTTP_GET } from "../../../libs/HTTP";
import { useEffect, useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import {
  RiText,
  RiGroupLine,
  RiAlignLeft,
  RiCalendarEventLine,
  RiTimer2Line,
  RiMapPinLine,
  RiRoadMapLine,
  RiBuilding4Line,
} from "react-icons/ri";

import Button from "../button";
import ImageProfile from "../imageProfile";
import Input from "../input";

const AddEvent = ({ userId }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    organizerId: `${userId}`,
    category: "",
    capacity: 0,
    title: "",
    description: "",
    date: "",
    time: "",
    poster: null,
    city: "",
    place: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (image) => {
    setFormData({
      ...formData,
      poster: image,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await HTTP_POST("events", formData);
      router.push(`/event/${response.data._id}`);
    } catch (error) {
      console.error("Error add event:", error);
      //TODO: Aggiungere la modale!
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const categories = await HTTP_GET("categories");
      setCategories(categories.data);
    };
    getCategories();
  }, []);

  return (
    <div className={styles.AddEvent}>
      <div className={styles.BannerSide}>
        <img src="/bannerAdd.jpg" alt="" />
      </div>
      <div className={styles.FormSide}>
        <h1>Aggiungi evento</h1>
        <form onSubmit={handleSubmit} className={styles.FormAddEvent}>
          <div className={styles.Box_Input}>
            <select
              name="category"
              onChange={handleChange}
              className={styles.Select}
            >
              <option>Seleziona categoria</option>
              {categories.map((category, key) => (
                <option key={key} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.Box_Input}>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Titolo evento"
              icon={<RiText />}
            />
          </div>
          <div className={styles.Box_Input}>
            <Input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Numero biglietti"
              icon={<RiGroupLine />}
            />
          </div>
          <div className={styles.Box_Input}>
            <Input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descrizione evento"
              icon={<RiAlignLeft />}
            />
          </div>

          <div className={styles.Box_Input}>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Data evento"
              icon={<RiCalendarEventLine />}
            />
          </div>
          <div className={styles.Box_Input}>
            <Input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              icon={<RiTimer2Line />}
            />
          </div>

          <div className={styles.ImagePreview}>
            <p>Carica un'immagine dell'evento</p>
            <ImageProfile
              onImageChange={handleImageChange}
              icon={<MdAddPhotoAlternate />}
              type="events"
            />
          </div>
          <div className={styles.Box_Input}>
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Città"
              icon={<RiMapPinLine />}
            />
          </div>
          <div className={styles.Box_Input}>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Indirizzo"
              icon={<RiRoadMapLine />}
            />
          </div>
          <div className={styles.Box_Input}>
            <Input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              placeholder="Luogo"
              icon={<RiBuilding4Line />}
            />
          </div>
          <Button type="submit" textButton="Salva" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
