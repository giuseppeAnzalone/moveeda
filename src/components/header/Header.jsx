import styles from "./index.module.scss";

import Menu from "../menu";

const Header = ({ userType }) => {
  return (
    <header className={styles.Header}>
      <div className={styles.Wrapper}>
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet="/moveeda-whitelogo.gif"
            className={styles.Logo}
          />
          <img
            src="/logo-moveeda.gif"
            alt="logo moveeda"
            className={styles.Logo}
          />
        </picture>
        <Menu userType={userType} />
      </div>
    </header>
  );
};

export default Header;
