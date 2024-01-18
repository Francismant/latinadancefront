import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context";


function Delete() {
    const { user, logout } = useContext(AuthContext);

    const [feedback, setFeedBack] = useState("");
    const navigate = useNavigate();

    async function handleDelete() {
        try {
            await fetch(`http://localhost:8000/api/users/deleteUser/${user.idUser}`, {
                method: "DELETE",
            });
            setFeedBack("votre compte a bien été supprimé");
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="top">
            <h3 className="mt3pc mb3pc tac">Vous êtes sur le point de supprimer votre compte</h3>
            {feedback && <p className="feedback tac">{feedback}</p>}
            <button onClick={() => { handleDelete(); logout(); }} className="btn btn-primary m0auto">
                Supprimer mon compte
            </button>
        </section>
    );
}

export default Delete;