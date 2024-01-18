import Navbar from "../../assets/components/Navbar/Navbar";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context";


function Header() {
  const { user, logout } = useContext(AuthContext);
 
  return (
    <header>
      <section className={`df aic ${styles.headerResponsive}`}>
        <div className={styles.sizeHeaderLeft}>
          <div className={`df fc jcc aic ${styles.latina}`}>
            <Link end to="/">
              <p className="fweight4">LILLE</p>
              <p className="fweight4">LATINA</p>
              <p className="ffamily2">Dance</p>
            </Link>
          </div>
        </div>
        <Navbar />
        <div className={styles.register}>
          <ul>
            {user ? (
              <>
                <button className={`btn btn-primary-reverse mr20`}>
                  <Link to="/Profile">Profil</Link>
                </button>
                <button onClick={logout} className={`mr20 btn btn-primary`}>
                  <Link to="/">Déconnexion</Link>
                </button>
              </>
            ) : (
              <>
                <button className={`mr20 btn btn-primary`}>
                  <Link to="/createAccount">Inscription</Link>
                </button>
                <button className={`btn btn-primary-reverse`}>
                  <i className="fas fa-right-to-bracket mr5"></i>
                  <Link to="/Login">Connexion</Link>
                </button>
              </>
            )}
          </ul>
        </div>
      </section>
    </header>
  );
}

export default Header;
