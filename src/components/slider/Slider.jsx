import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { HTTP_GET } from "../../../libs/HTTP";
import Link from "next/link";
import Container from "../container";

const Hero = () => {
  const [events, setEvents] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const getEvents = async () => {
      const events = await HTTP_GET("events?limit=5");
      setEvents(events.data);
    };
    getEvents();
  }, []);

  useEffect(() => {
    const updateCounter = () => {
      setCounter((prev) => (prev + 1) % events.length);
    };

    const intervalId = setInterval(updateCounter, 4000);
    return () => clearInterval(intervalId);
  }, [events]);

  const handlePrevClick = () => {
    setCounter((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const handleNextClick = () => {
    setCounter((prev) => (prev + 1) % events.length);
  };
  return (
    <Container>
      <div className={styles.Slider}>
        <div className={styles.Overlay}>
          <h5>{events[counter]?.title}</h5>
          <p>{events[counter]?.description}</p>
          <Link
            className={styles.ShowMore}
            href={`event/${events[counter]?._id}`}
          >
            Scopri di più...
          </Link>
        </div>
        <div className={styles.BackgroundImage}>
          <img
            src={`events/${events[counter]?.poster}`}
            alt={events[counter]?.title}
          />
        </div>
        <div className={styles.Actions}>
          <FaAngleLeft className={styles.Arrow} onClick={handlePrevClick} />
          <FaAngleRight className={styles.Arrow} onClick={handleNextClick} />
        </div>
      </div>
    </Container>
  );
};

export default Hero;
