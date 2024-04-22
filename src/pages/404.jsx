import styles from "@/styles/404.module.scss";

import Link from "next/link";
import { FaCircleArrowLeft } from "react-icons/fa6";

export default function Custom404() {
  return (
    <>
      <div className={styles.container}>
        <img src="/404gif.gif" alt="404 gif" className={styles.gif} />
        <h3>this is not cool</h3>
      </div>
      <div className={styles.TextContainer}>
        <h4>404</h4>
        <h2>
          Please, try something <span>else</span>
        </h2>
        <Link href="/">
          <FaCircleArrowLeft className={styles.BackArrow} />
        </Link>
      </div>
    </>
  );
}
