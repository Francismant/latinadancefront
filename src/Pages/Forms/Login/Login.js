import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { AuthContext } from "../../../context";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const [feedbackGood, setFeedBackGood] = useState("");
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Le champ est obligatoire")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Votre email n'est pas valide"
      ),
    password: yup.string().required("Le champ est obligatoire"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    reset,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  async function submit(values) {
    try {
      clearErrors();
      await login(values);
      setFeedBackGood("Connexion réussie, vous allez être redirigé");
      reset();
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    } catch (error) {
      setError("generic", {
        type: "generic",
        message: "Email ou mot de passe incorrect",
      });
    }
  }

  return (
    <main>
      <section className="top">
        <h2 className="mt3pc">Connexion</h2>
        <form className="df fc jcc aic" onSubmit={handleSubmit(submit)}>
          <div className="df fc mb10">
            <label htmlFor="email" className="mb10">
              Email
            </label>
            <input type="email" id="email" {...register("email")} />
            {errors?.email && (
              <p className="feedback">{errors.email.message}</p>
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
          {feedbackGood && (
            <p className="feedbackGood mb20">{feedbackGood}</p>
          )}
          {errors?.generic && (
            <p className="feedback mb20">
              {errors.generic.message}
            </p>
          )}
          <div className="df fc mb10 underline">
            <Link to="/forgotPassword">Mot de passe oublié ?</Link>
          </div>
          <button className="btn btn-primary mt3pc mb3pc">
            Se connecter
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
