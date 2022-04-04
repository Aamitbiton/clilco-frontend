import React from "react";
import "./registrationForm.css";
import AppForm from "../../components/Form/AppForm";
import registrationSchema from "./validationSchema";
import SubmitButton from "../../components/Form/SubmitButton";
import FormFiled from "../../components/Form/FormFiled";
import AppStack from "../../components/AppStack";
import { days, months, years } from "../../utils/dates";
import FormSelectField from "../../components/Form/FormSelectField";
import { religions } from "./FormOptions";
import FormAutoComplete from "../../components/Form/FormAutoComplete";
import AppAutoComplete from "../../components/Inputs/AppAutoComplete";

export const RegistrationForm = () => {
  const flex = {
    display: "flex",
    alignItems: "center",
    height: "100vh",
    justifyContent: "center",
  };
  return (
    <>
      <div style={flex}>
        <AppForm
          validationSchema={registrationSchema}
          onSubmit={(values) => console.log(values)}
          initialValues={{
            name: "",
            day: "",
            month: "",
            year: "",
            religion: "",
            city: "",
          }}
        >
          <FormFiled name={"name"} />
          <AppStack>
            <FormSelectField name={"day"} label={"יום"} options={days} />
            <FormSelectField name={"month"} label={"חודש"} options={months} />
            <FormSelectField name={"year"} label={"שנה"} options={years} />
          </AppStack>
          <FormSelectField label={"דת"} name={"religion"} options={religions} />
          {/*<FormSelectField label={"עיר מגורים"} name={"city"} />*/}
          {/*<FormAutoComplete options={["yan", "lala", "bol"]} />*/}
          <AppAutoComplete
            renderInput={(r) => console.log(r)}
            options={["er", "erw", "qqq"]}
          />
          <SubmitButton label={"send"} />
        </AppForm>
      </div>
    </>
  );
};
