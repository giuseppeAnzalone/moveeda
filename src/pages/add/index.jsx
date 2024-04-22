import { getSession } from "next-auth/react";

import Header from "../../components/header";
import AddEvent from "../../components/addEvent";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

export default function AddEventPage({ session }) {
  return (
    <>
      <Header userType={session?.user?.type} />
      <AddEvent userId={session?.user.id} />
      <NavBar userType={session?.user?.type} />
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
