import styles from "./ConditionsGénérales.module.scss"

function ConditionsGénérales() {
  return (
    <div className="center">
        <h2 className={styles.top} >Conditions générales du site LilleLatinaDance</h2>
        <div className="df fc gap1 mb3pc" >
        <h3>1 Inscription</h3>
        <p>1.1 Pour vous inscrire sur LilleLatinaDance, vous devez fournir des informations précises, véridiques et à jour, notamment :</p>
        <ul>
            <li>.Votre nom complet.</li>
            <li>.Une adresse email valide.</li>
            <li>.Un mot de passe sécurisé.</li>
        </ul>
        <p>1.2 Vous êtes responsable de la confidentialité de votre mot de passe. Ne partagez jamais votre mot de passe avec d'autres utilisateurs.</p>
        <h3>2 Protection des Données</h3>
        <p>2.1 Vos informations personnelles, y compris votre nom et votre adresse email, seront traitées conformément à notre Politique de Confidentialité.</p>
        <h3>3 Engagement de LilleLatinaDance</h3>
        <p>3.1 LilleLatinaDance s'engage à protéger vos données personnelles conformément à notre Politique de Confidentialité.</p>
        <h3>4 Engagement de l'Utilisateur</h3>
        <p>4.1 Vous vous engagez à ne pas utiliser LilleLatinaDance à des fins illégales, frauduleuses ou nuisibles.</p>
        <p>4.2 Vous vous engagez à ne pas publier de contenu offensant, diffamatoire ou inapproprié sur LilleLatinaDance.</p>
        <h3>5 Acceptation des Conditions</h3>
        <p>5.1 En vous inscrivant sur LilleLatinaDance, vous acceptez les présentes Conditions Générales d'Utilisation.</p>
        <p>5.2 Vous comprenez que LilleLatinaDance se réserve le droit de suspendre ou de fermer votre compte en cas de non-respect des présentes Conditions.</p>
        <h3>6 Modification des Conditions</h3>
        <p>6.1 LilleLatinaDance se réserve le droit de modifier ces Conditions à tout moment. Toute modification sera notifiée aux utilisateurs.</p>
        <p>6.2 Il est de votre responsabilité de consulter régulièrement les Conditions Générales d'Utilisation.</p>
        <h3>7 Clause sur l'utilisation des cookies fonctionnels</h3>
        <p>En utilisant ce site, vous consentez à l'utilisation de cookies fonctionnels. Ces cookies sont essentiels au bon fonctionnement du site et sont utilisés pour vous permettre de rester connecté(e) à votre compte entre les sessions. Ces cookies ne collectent pas d'informations personnelles et sont automatiquement supprimés lorsque vous vous déconnectez.
        Vous avez la possibilité de désactiver ces cookies dans les paramètres de votre navigateur, mais cela pourrait affecter certaines fonctionnalités du site.</p>
        <h4>Pour toute question ou préoccupation concernant ces Conditions Générales d'Utilisation, veuillez nous contacter à lillelatinadance@org.fr.</h4>
        <h4>En cliquant sur le bouton "S'inscrire", vous confirmez avoir lu, compris et accepté les présentes Conditions Générales d'Utilisation.</h4>
        </div>
    </div>
  )
}

export default ConditionsGénérales