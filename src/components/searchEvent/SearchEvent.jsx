import styles from "./index.module.scss";
import { HTTP_GET } from "../../../libs/HTTP";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useState } from "react";
import EventCat from "../eventCat";
import EventList from "../eventList";
import Button from "../button";

const searchEvent = () => {
  const [inputValue, setInputValue] = useState("");
  const [eventData, setEventData] = useState([]);
  const [showEventCat, setShowEventCat] = useState(true);
  const [showEventResult, setShowEventResult] = useState(false);

  const onInputInsert = (e) => setInputValue(e.target.value);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const events = await HTTP_GET(`search?query=${inputValue}`);
    setEventData(events.data);
    setShowEventResult(true);
    setShowEventCat(false);
  };

  const handleGoBack = () => {
    setEventData({});
    setShowEventResult(false);
    setShowEventCat(true);
    setInputValue("");
  };

  return (
    <>
      <form className={styles.FormSearchEvent} onSubmit={onHandleSubmit}>
        <input
          type="text"
          placeholder="Cerca evento"
          className={styles.SearchEvent}
          onChange={onInputInsert}
          value={inputValue}
        />
        <Button type="submit" textButton="Cerca" onClick={onHandleSubmit} />
      </form>
      <div className={styles.EventCatContainer}>
        {showEventCat && <EventCat />}
      </div>
      <div className={styles.EventsContainer}>
        {eventData?.length > 0 && (
          <EventList title="Risultati" events={eventData} />
        )}
        {showEventResult && (
          <FaCircleArrowLeft
            onClick={handleGoBack}
            className={styles.BackArrow}
          />
        )}
      </div>
    </>
  );
};

export default searchEvent;
