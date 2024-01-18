import { useState, useEffect } from "react";
import styles from "./Events.module.scss";
import Loading from "../../assets/components/Loading/Loading";
import { useFetchData } from "../../hooks/useFetchData";
import Event from "./components/Event";
import { getInfosCours } from "../../apis/infos";

function Events() {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const infosData = await getInfosCours();
      setInfos(infosData);
    }

    fetchData();
  }, []);

  const [[events, setEvents], isLoading] = useFetchData(
    "http://localhost:8000",
    "api/events/getEvents"
  );

  function deleteEvent(idEvent) {
    setEvents(events.filter((e) => e.idEvent !== idEvent));
  }

  return (
    <section className={styles.topEvents}>
      <div className={`df fc jcsb ${styles.backgroundTopEvents}`} aria-label="photo centrée sur les chaussures d'un danseur et une danseuse lors d'une soirée">
        <h1 className={styles.headerTitle}>EVENEMENTS</h1>
      </div>
      {infos.length > 0 && (
        <div className="warning">
          {" "}
          <h3 className="feedbackWarning center tac mb3pc">{infos[0].text}</h3>
        </div>
      )}
      <main className="center df fc gap1">
        <h2 className="mb3pc">
          Retrouvez ici les évènements ponctuels proposés par notre école{" "}
        </h2>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="df fc gap2 jcc aic">
            {events.map((event) => (
              <Event
                key={event.idEvent}
                deleteEvent={deleteEvent}
                event={event}
              />
            ))}
          </div>
        )}
        <p className={styles.vote}>
          N’oubliez pas de vous connecter à votre compte afin de pouvoir voter
          pour la danse que vous souhaitez voir mise en avant lors de nos
          prochains stages (avant le 20 du mois en cours)
        </p>
      </main>
    </section>
  );
}

export default Events;
