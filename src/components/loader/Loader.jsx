import styles from "./index.module.scss";

const Loader = () => {
  return (
    <div className={styles.Container}>
      <span className={styles.Loader}></span>
    </div>
  );
};

export default Loader;
