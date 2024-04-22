import { getSession } from "next-auth/react";

import Header from "../../components/header";
import SearchEvent from "../../components/searchEvent";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

export default function SearchEventPage({ session }) {
  return (
    <>
      <Header userType={session?.user?.type} />
      <SearchEvent />
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
