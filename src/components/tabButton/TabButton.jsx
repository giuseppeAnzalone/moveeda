import styles from "./index.module.scss";

const TabButton = ({ children, onSelect, color }) => {
  const name = children.split("E");
  const firstPart = name[0] + "E";
  const secondPart = "E" + name[2];

  return (
    <li className={styles.TabItems}>
      <button className={styles.TabBtn} onClick={onSelect}>
        {firstPart}
        <del
          style={{
            textDecorationColor: `${color}`,
            textDecorationThickness: "3px",
          }}
        >
          {secondPart}
        </del>
      </button>
    </li>
  );
};

export default TabButton;
