import styles from "./Footer.module.scss";
import fb from "../../assets/images/facebook.png";
import insta from "../../assets/images/instagram.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="colorFooter">
      <section className={styles.icons}>
        <a href="https://www.facebook.com/">
          <img className="ml20" src={fb} alt="logo de facebook" />
        </a>
        <div className={`df fc jcc aic fsize2 ${styles.footerLogo}`}>
          <p>LILLE</p>
          <p>LATINA</p>
          <p className="ffamily3">Dance</p>
        </div>
        <a href="https://www.instagram.com/">
          <img src={insta} alt="logo de instagram" />
        </a>
      </section>
      <section className={`df jcc fsize08 ${styles.footerend}`}>
        <p>Copyright©2023 |Tous droits réservés -</p>
        <span>
          <Link to="/mentions">Mentions légales</Link>
        </span>
      </section>
    </footer>
  );
}

export default Footer;
