import { HTTP_GET } from "../../../libs/HTTP";
import { useState, useEffect } from "react";
import EventList from "../eventList";
import Pageable from "../pageable";
import Loader from "../loader";

const MyEvents = ({ userId }) => {
  const [myEvents, setMyEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      const events = await HTTP_GET(`events/search?organizerId=${userId}`);
      setMyEvents(events);
      setLoading(false);
    };
    getEvents();
  }, []);

  const handlePageChange = async (pageNumber) => {
    const events = await HTTP_GET(
      `events/search?organizerId=${userId}&page=${pageNumber}`
    );
    setMyEvents(events);
    setLoading(false);
  };

  return (
    <>
      {!isLoading ? (
        <>
          <EventList title={"i miei eventi"} events={myEvents.data} />
          <Pageable
            pagesNumber={myEvents?.totalPages}
            page={myEvents?.currentPage}
            setPage={handlePageChange}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MyEvents;
