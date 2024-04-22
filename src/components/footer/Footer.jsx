import styles from "./index.module.scss";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <h4>Edgemony | Final Project</h4>
      <h4>#CB8 | Team E</h4>
      <Link href="/about">
        <h4>About Us</h4>
      </Link>
    </footer>
  );
};

export default Footer;
