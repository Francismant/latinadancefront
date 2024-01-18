import React from "react";
import { useState } from "react";

function ChangeInfos() {
  const [changeFeedbackGood, setChangeFeedbackGood] = useState("");
  const [text, setText] = useState("");
  const [errorFeedback, setErrorFeedback] = useState("");

  // async function changeInfos(choice) {
  //   let infos
  //   if (choice === 1) {
  //     infos = text;
  //   } else {
  //     infos = "";
  //   }
  //   try {
  //     const response = await fetch(
  //       "http://localhost:8000/api/infos/changeInfos",
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ infos }),
  //       }
  //     );
  //     if (response.ok && choice === 1) {
  //       await response.json();
  //       setChangeFeedbackGood("le message d'alerte a bien été mis en place");
  //     } else if (response.ok && choice === 2) {
  //       await response.json();
  //       setChangeFeedbackGood("message supprimé avec succès");
  //     }
  //     setTimeout(() => { setChangeFeedbackGood("") }, 3000)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function changeInfos(choice) {
    // Vérifier si le champ d'entrée est vide pour le choix 1
    if (choice === 1 && !text.trim()) {
      setErrorFeedback("Veuillez entrer un texte avant de sauvegarder.");
      setTimeout(() => {
        setErrorFeedback("");
      }, 3000);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/infos/changeInfos",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ infos: text }),
        }
      );

      if (response.ok && choice === 1) {
        await response.json();
        setChangeFeedbackGood("Le message d'alerte a bien été mis en place");
        setErrorFeedback("");
      } else if (response.ok && choice === 2) {
        await response.json();
        setChangeFeedbackGood("Message supprimé avec succès");
      }

      // Réinitialiser le texte et le message de feedback
      setText("");
      setTimeout(() => {
        setChangeFeedbackGood("");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <section>
      <h3 className="tac mt3pc mb3pc center">
        Si vous souhaitez mettre un message d'information concernant les cours, entrez votre
        texte ci-dessous et cliquez sur Sauvegarder ou cliquez sur supprimer le message.
      </h3>
      <div className="df fc gap1 aic">
        <label htmlFor="text">message à modifier</label>
        <input
          onChange={(e) => setText(e.target.value)}
          type="text"
          id="text"
        />
        {changeFeedbackGood && (
          <p className="feedbackGood mb20 tac">
            {changeFeedbackGood}
          </p>
        )}
        {errorFeedback && (
          <p className="feedback mb20 tac">{errorFeedback}</p>
        )}
        <button
          onClick={() => {
            changeInfos(1);
          }}
          className="btn btn-primary"
        >
          Sauvegarder
        </button>
        <button
          onClick={() => {
            changeInfos(2);
          }}
          className="btn btn-primary-reverse mb3pc"
        >supprimer le message</button>
      </div>
    </section>
  );
}

export default ChangeInfos;
