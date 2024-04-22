import styles from "../../styles/Ticket.module.scss";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { HTTP_GET } from "../../../libs/HTTP";

import Header from "../../components/header";
import BannerEvent from "../../components/bannerEvent";
import TicketInfo from "../../components/ticketInfo";
import NavBar from "../../components/navBar";

export default function Ticket({ session }) {
  const router = useRouter();
  const [ticket, setTicket] = useState({});

  useEffect(() => {
    const getTicket = async () => {
      HTTP_GET(`reservations/${router.query.id}`).then(async (ticket) => {
        const eventInfo = await HTTP_GET(`events/${ticket?.data?.eventId}`);

        const tempTicket = {
          ticketId: ticket?.data?.eventId,
          ticketsBooked: ticket?.data?.ticketsBooked,
          ...eventInfo?.data,
        };
        setTicket(tempTicket);
      });
    };

    getTicket();
  }, [router.query.id]);

  useEffect(() => {
    const loadSession = async () => {
      if (!session) router.push("/login");
    };
    loadSession();
  }, [router, session]);

  return (
    <>
      <Header userType={session?.user?.type} />
      {Object.keys(ticket).length > 0 ? (
        <div className={styles.Ticket}>
          <div className={styles.Wrapper}>
            <BannerEvent img={ticket.poster} title={ticket.title} />
            <TicketInfo ticket={ticket} />
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      <NavBar userType={session?.user?.type} />
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
