import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createNewPassword } from "../../apis/users";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [feedBackGood, setFeedBackGood] = useState("");
  const navigate = useNavigate();

  const yupSchema = yup.object({
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
  });

  const defaultValues = {
    password: "",
    confirmPassword: "",
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
      const { password } = values;
      const email = new URLSearchParams(window.location.search).get("email");
      await createNewPassword({ email, password });
      setFeedBackGood("Mot de passe modifié, vous allez être redirigé");
      reset();
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError("generic", { type: "generic", message: error.message });
    }
  }

  return (
    <main className="center">
      <section className="top">
        <h2 className="mt3pc">Réinitialisation du mot de passe</h2>
        <form className="df fc jcc aic" onSubmit={handleSubmit(submit)}>
          <div className="df fc jcc aic gap2">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" {...register("password")} />
            {errors?.password && (
              <p className="feedback">{errors.password.message}</p>
            )}
            <label htmlFor="confirmPassword">Confirmation Password</label>
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
            {feedBackGood && (
              <p className="feedbackGood">{feedBackGood}</p>
            )}
            {errors?.generic && (
              <p className="feedback">{errors.generic.message}</p>
            )}
            <button className="btn btn-primary">Enregistrer</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default ResetPassword;
