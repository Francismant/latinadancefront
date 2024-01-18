import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context";
import AddNewEvent from "../Events/components/AddNewEvent";
import ChangeInfos from "./components/ChangeInfos";

function Profile() {
  const { user } = useContext(AuthContext);
  const [allTheDances, setAllTheDances] = useState([]);
  const [voteDance, setVoteDance] = useState([]);
  const [feedbackGood, setFeedBackGood] = useState("");
  const [errorFeedback, setErrorFeedback] = useState("");
  const [noVoteFeedback, setNoVoteFeedback] = useState(""); // Nouvel état

  const navigate = useNavigate();

  useEffect(() => {
    async function getDances() {
      try {
        const response = await fetch(
          "http://localhost:8000/api/dances/getDances"
        );
        if (response.ok) {
          const dances = await response.json();
          setAllTheDances(dances);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getDances();
  }, []);

  useEffect(() => {
    async function CountOfDances() {
      try {
        const response = await fetch(
          "http://localhost:8000/api/dances/totalVote"
        );
        if (response.ok) {
          const dancingVote = await response.json();
          setVoteDance(dancingVote);
        }
      } catch (error) {
        console.error(error);
      }
    }
    CountOfDances();
  }, []);

  const defaultValues = {
    dances: [],
  };

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  async function submit(values) {
    console.log("values", values);
    try {
      if (!values.dances || values.dances.length === 0) {
        setErrorFeedback("Veuillez sélectionner une danse avant de soumettre.");
        return;
      }
      let data = { values, id: user.idUser };
      const response = await fetch("http://localhost:8000/api/dances/vote", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const voteUser = await response.json();
        setFeedBackGood(voteUser.messageGood);
        reset(defaultValues);
        setErrorFeedback("");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function getDanceName(idDance) {
    switch (idDance) {
      case 1:
        return "Salsa";
      case 2:
        return "Bachata";
      case 3:
        return "Kizomba";
      default:
        return "Inconnu";
    }
  }

  // async function resetVotes() {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:8000/api/dances/resetVotes",
  //       {
  //         method: "PATCH",
  //       }
  //     );
  //     if (response.ok) {
  //       const resetResponse = await response.json();
  //       setVoteDance(null);
  //       setFeedBackGood(resetResponse.message);
  //       setTimeout(() => { setFeedBackGood(""); }, 3000);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function resetVotes() {
    try {
      // Mettre à jour les votes avant la réinitialisation
      const updatedVotesResponse = await fetch(
        "http://localhost:8000/api/dances/totalVote"
      );
  
      if (updatedVotesResponse.ok) {
        const updatedDancingVote = await updatedVotesResponse.json();
        setVoteDance(updatedDancingVote);
  
        // Afficher le message approprié en fonction de la présence ou de l'absence de votes
        if (updatedDancingVote.length === 0) {
          setNoVoteFeedback("Aucun vote en cours.");
          setTimeout(() => {
            setNoVoteFeedback("");
          }, 3000);
          return;
        }
      }
  
      // Réinitialisation des votes
      const response = await fetch(
        "http://localhost:8000/api/dances/resetVotes",
        {
          method: "PATCH",
        }
      );
  
      if (response.ok) {
        const resetResponse = await response.json();
        setVoteDance(null)
        setFeedBackGood(resetResponse.message);
  
        setTimeout(() => {
          setFeedBackGood("");
          setNoVoteFeedback("");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <main className="top center">
      <h3 className="tac mb3pc">Bienvenue sur votre profil {user.name}</h3>
      {user && user.admin === 1 && (
        <>
          <section className="flex-fill df fc jcc aic mb3pc mt3pc gap1">
            <p>Résultats des votes pour le mois en cours</p>
            <ul>
              {voteDance && voteDance.length > 0 ? (
                voteDance.map((dancingVote) => (
                  <li key={dancingVote.idDance}>
                    Danse: {getDanceName(dancingVote.idDance)}, Nombre de votes:{" "}
                    {dancingVote.CountOfDances}
                  </li>
                ))
              ) : (
                <li>Aucun vote</li>
              )}
            </ul>
            {feedbackGood && (
              <p className="feedbackGood mb20">{feedbackGood}</p>
            )}
            {noVoteFeedback && (
              <p className="feedback mb20">{noVoteFeedback}</p>
            )}
            <button onClick={resetVotes} className="btn btn-primary">
              Réinitialiser les votes
            </button>
          </section>
          <div className="df  fc aic">
            <h2 className="mb20 mt3pc">Ajouter un évènement</h2>
            <AddNewEvent />
          </div>
          <ChangeInfos />
          <h4 className="tac mb3pc">
            Cliquez{" "}
            <span>
              <Link className="underline" to="/forgotPassword">
                ici
              </Link>
            </span>{" "}
            si vous souhaitez modifier votre mot de passe
          </h4>
        </>
      )}
      {user && user.admin === 0 && (
        <section>
          <h4 className="tac">
            Quelle danse souhaiteriez vous voir mise en avant lors de nos
            prochains stages ?
          </h4>
          <p className="tac fsize08">
            (Les votes ne sont plus comptabilisés après le 20 du mois en cours)
          </p>
          <div className="mb3pc mt3pc">
            <form className="df fc aic jcc mb10" onSubmit={handleSubmit(submit)}>
            
                <label className="mb10 tac">
                  <span>Dances</span>
                </label>
                <ul>
                  <li className="mb10">
                    <select {...register(`dances`)}>
                      <option value="" disabled>
                        Faites votre choix
                      </option>
                      {allTheDances.map((dance) => (
                        <option key={dance.idDance} value={dance.idDance}>
                          {dance.nameDance}
                        </option>
                      ))}
                    </select>
                  </li>
                </ul>
                {feedbackGood && (
                  <p className="feedbackGood mb20 tac">{feedbackGood}</p>
                )}
                {errorFeedback && (
                  <p className="feedback mb20 tac">{errorFeedback}</p>
                )}
                <button className="btn btn-primary">
                  Envoyer
                </button>
            </form>
          </div>
          <h4 className="tac mb3pc">
            Cliquez{" "}
            <span>
              <Link className="underline" to="/forgotPassword">
                ici
              </Link>
            </span>{" "}
            si vous souhaitez modifier votre mot de passe
          </h4>
          <h4 className="tac mb3pc">
            Cliquez{" "}
            <span>
              <Link className="underline" to="/Delete">
                ici
              </Link>
            </span>{" "}
            si vous souhaitez supprimer votre compte
          </h4>
        </section>
      )}
    </main>
  );
}

export default Profile;
