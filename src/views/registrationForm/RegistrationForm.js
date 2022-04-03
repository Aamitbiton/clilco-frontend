import React from "react";
import "./registrationForm.css";
import AppForm from "../../components/Form/AppForm";
import TextInput from "../../components/TextInput";
import registrationSchema from "./validationSchema";
import SubmitButton from "../../components/Form/SubmitButton";
import FormFiled from "../../components/Form/FormFiled";

export const RegistrationForm = () => {
  return (
    <>
      <AppForm
        validationSchema={registrationSchema}
        onSubmit={(values) => console.log(values)}
        initialValues={{
          email: "",
          password: "",
        }}
      >
        <FormFiled name={"email"} />
        <FormFiled name={"password"} />
        <SubmitButton label={"send"} />
      </AppForm>
    </>
  );
};
