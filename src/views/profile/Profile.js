import React from "react";
import "./profile.css";
import { RegistrationForm } from "../registrationForm/RegistrationForm";
import { Header } from "../home/components/header/header";
import AppForm from "../../components/Form/AppForm";
import FormFiled from "../../components/Form/FormFiled";
import CenterLayout from "../../components/CenterLayout";
import SubmitButton from "../../components/Form/SubmitButton";
import { useSelector } from "react-redux";
import Title from "../../components/title/title";
import FormSelectField from "../../components/Form/FormSelectField";

export const Profile = () => {
  const user = useSelector((s) => s.user.user.public);
  console.log({ user });
  return (
    <>
      <Header />
      <CenterLayout direction={"column"}>
        <Title title={"פרטים אישיים"} />
        <AppForm
          initialValues={{
            name: user.name,
            gender: user.gender,
            wanted: user.wanted,
            religion: user.religion,
          }}
        >
          <FormFiled defaultValue={user.name} label={"שם פרטי"} name={"name"} />
          <FormFiled defaultValue={user.gender} label={"אני"} name={"gender"} />
          <FormFiled
            defaultValue={user.wanted}
            label={"מעונין להכיר"}
            name={"wanted"}
          />
          <FormFiled
            defaultValue={user.religion}
            label={"דת"}
            name={"religion"}
          />
          <FormFiled />
          <SubmitButton />
        </AppForm>
      </CenterLayout>
    </>
  );
};
