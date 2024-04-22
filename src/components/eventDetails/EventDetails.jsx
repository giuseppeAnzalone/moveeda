import styles from "./index.module.scss";
import {
  FaCalendar,
  FaClock,
  FaTicket,
  FaLocationDot,
  FaShop,
} from "react-icons/fa6";

const EventDetails = ({ event }) => {
  return (
    <div className={styles.Details}>
      <div className={styles.Head__info}>
        <div className={styles.MainInfo}>
          <h3>{event.title}</h3>
          <div className={styles.DateAndTime}>
            <div className={styles.Info}>
              <FaCalendar /> {event.date}
            </div>
            <div className={styles.Info}>
              <FaClock /> {event.time}
            </div>
            <div className={styles.Info}>
              <FaLocationDot /> {event.city}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.Location}>
        <p>
          <FaShop /> {event.place}
        </p>
        <div className={styles.Capacity}>
          <p className={styles.CapacityText}>
            <FaTicket />{" "}
            {event.capacity > 0
              ? `${event.capacity} posti rimanenti`
              : "Evento Sold Out!"}
          </p>
        </div>
      </div>

      <div className={styles.Description}>
        <p>{event.description}</p>
      </div>
      <h3>{event.organizer}</h3>
    </div>
  );
};

export default EventDetails;
