import Header from "../../components/header";
import MyEvents from "../../components/myEvents";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";
import { getSession } from "next-auth/react";

export default function myEventsList({ session }) {
  return (
    <>
      <Header userType={session?.user?.type} />
      <MyEvents userId={session?.user?.id} />
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
