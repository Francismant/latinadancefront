import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../apis/users";

function ForgotPassword() {
  const [feedbackGood, setFeedbackGood] = useState("");

  const yupSchema = yup.object({
    email: yup
      .string()
      .required("Le champ est obligatoire")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Votre email n'est pas valide"
      ),
  });

  const defaultValues = {
    email: "",
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
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  async function submit(values) {
    const { email } = values;

    try {
      clearErrors();

      const passwordReset = await resetPassword(email);

      if (passwordReset) {
        setFeedbackGood("email envoyé");
        reset();
        setTimeout(() => {
          setFeedbackGood(null);
        }, 4000);
      }
    } catch (error) {
      setError("generic", { type: "generic", message: "Email inexistant" })
    }
  }

  return (
    <main className="center">
      <section className="top">
        <h2 className="mt3pc">
          Notez ci-dessous votre adresse mail afin de recevoir un lien pour
          modifier votre mot de passe
        </h2>
        <form onSubmit={handleSubmit(submit)}>
          <div className="df fc mb20 jcc aic gap2">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register("email")} />
            {errors?.email && (
              <p className="feedback">{errors.email.message}</p>
            )}
            {feedbackGood && (
              <p className="feedbackGood mb20">{feedbackGood}</p>
            )}
            {errors?.generic && (
              <p className="feedback mb20">
                {errors.generic.message}
              </p>
            )}
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default ForgotPassword;
