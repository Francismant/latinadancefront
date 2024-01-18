import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styles from "./Register.module.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { createUser } from "../../../apis/users";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const [feedBackGood, setFeedBackGood] = useState("");

  const yupSchema = yup.object({
    name: yup
      .string()
      .required("Le champ est obligatoire")
      .min(2, "Le champ doit contenir au minimum 2 caractères")
      .max(12),
    password: yup
      .string()
      .required("Le champ est obligatoire")
      .min(5, "Mot de passe trop court")
      .max(10, "Mot de passe trop long"),
    confirmPassword: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf(
        [yup.ref("password", "")],
        "Les mots de passe ne correspondent pas"
      ),
    acceptedTerms: yup
      .boolean()
      .oneOf([true], "Vous devez accepter les conditions générales"),
  });

  const defaultValues = {
    name: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(yupSchema),
    mode: "onChange",
  });

  async function submit(values) {
    try {
      clearErrors();
      const { name, password } = values;
      const email = new URLSearchParams(window.location.search).get("email");
      await createUser({ email, userValues: { name, password } });
      setFeedBackGood("Inscription réussie, vous allez être redirigé");
      reset();
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError("generic", { type: "generic", message: "Email déja existant" });
    }
  }

  return (
    <main>
      <section className="top">
        <h2 className="mt3pc ">Inscription</h2>
        <form className="df fc jcc aic" onSubmit={handleSubmit(submit)}>
          <div className="df fc mb10">
            <label htmlFor="name" className="mb10">
              nom
            </label>
            <input type="text" id="name" {...register("name")} />
            {errors?.name && (
              <p className="feedback">{errors.name.message}</p>
            )}
          </div>
          <div className="df fc mb10">
            <label htmlFor="password" className="mb10">
              Password
            </label>
            <input type="password" id="password" {...register("password")} />
            {errors?.password && (
              <p className="feedback">{errors.password.message}</p>
            )}
          </div>
          <div className="df fc mb10">
            <label htmlFor="confirmPassword" className="mb10">
              Confirmation Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
            />
            {errors?.confirmPassword && (
              <p className="feedback">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div>
            <div className={`df aic mt20 ${styles.checkbox}`}>
              <label className={styles.labelCheckbox} htmlFor="acceptedTerms">
                Accepter les{" "}
                <Link to="/Conditions" target="_blank">
                  <span className="fweight6">conditions générales</span>
                </Link>
              </label>
              <input
                className={styles.inputCheckbox}
                type="checkbox"
                id="acceptedTerms"
                {...register("acceptedTerms")}
              />
            </div>
            {errors?.acceptedTerms && (
              <p className="feedback">
                Vous devez accepter les conditions générales
              </p>
            )}
          </div>
          {feedBackGood && (
            <p className="feedbackGood">{feedBackGood}</p>
          )}
          {errors?.generic && (
            <p className="feedback">{errors.generic.message}</p>
          )}
          <button className="btn btn-primary mt3pc mb3pc">
            S'inscrire
          </button>
        </form>
      </section>
    </main>
  );
}

export default Register;
