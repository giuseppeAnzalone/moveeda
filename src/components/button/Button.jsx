import styles from "./index.module.scss";

const Button = ({
  onClick,
  textButton,
  type = "button",
  typeBtn = "default",
}) => {
  return (
    <button
      className={`${styles.Button} ${
        typeBtn !== "default" ? styles.BtnDanger : null
      }`}
      onClick={onClick}
      type={type}
    >
      {textButton}{" "}
    </button>
  );
};

export default Button;
