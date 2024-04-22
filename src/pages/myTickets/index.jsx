import { getSession } from "next-auth/react";
import { HTTP_GET } from "../../../libs/HTTP";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Header from "../../components/header";
import EventList from "../../components/eventList";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";
import Pageable from "../../components/pageable";

export default function MyTickets({ session }) {
  const [tickets, setTickets] = useState([]);
  const [pageEvents, setPageEvents] = useState(1);

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
    const getTickets = async () => {
      const tickets = await HTTP_GET(
        `reservations/getUserReservations?userId=${session?.user?.id}&page=1`
      );
      setTickets(tickets);
    };
    getTickets();
  }, [session, router]);

  const handlePageChange = (pageNumber) => {
    setPageEvents(pageNumber);
    fetch(
      `api/reservations/getUserReservations?userId=${session?.user?.id}&page=${pageNumber}`
    )
      .then((res) => res.json())
      .then((data) => setTickets(data));
  };

  return (
    <>
      <Header userType={session?.user?.type} />
      <EventList
        title={"Le mie prenotazioni"}
        events={tickets.data}
        endPoint={"ticket"}
      />
      <Pageable
        pagesNumber={tickets?.totalPages}
        page={tickets?.currentPage}
        setPage={handlePageChange}
      />
      <NavBar userType={session.user.type} />
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
