import styles from "./index.module.scss";
import EventCard from "../eventCard";
const EventsList = ({ title, events, endPoint = "event" }) => {
  return (
    <div>
      <h3 className={styles.SelectedCatName}>{title.toUpperCase()}</h3>
      <div className={styles.EventContainer}>
        {events?.length > 0 ? (
          events.map((event, key) => (
            <EventCard key={key} event={event} endPoint={endPoint} />
          ))
        ) : (
          <div className={styles.NoEvents}>
            <p>
              Non ci sono {endPoint === "event" ? "eventi" : "prenotazioni"}...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsList;
