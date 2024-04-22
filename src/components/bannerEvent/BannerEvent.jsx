import styles from "./index.module.scss";

const BannerEvent = ({ img, title }) => {
  console.log(img, title);
  return (
    <div className={styles.Banner}>
      <img
        src={`../events/${img}`}
        alt={`Locandina evento ${title}`}
        width={300}
        height={500}
      ></img>
    </div>
  );
};

export default BannerEvent;
