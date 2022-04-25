import React from "react";
import CenterLayout from "../../components/CenterLayout";
import Typography from "@mui/material/Typography";
import { Header } from "../home/components/header/header";
import Title from "../../components/title/title";
import AppForm from "../../components/Form/AppForm";
import AppStack from "../../components/AppStack";
import FormFiled from "../../components/Form/FormFiled";
import SubmitButton from "../../components/Form/SubmitButton";
import ContactValidation from "./contactValidation";

function Contact(props) {
  return (
    <>
      <Header />
      <CenterLayout direction={"column"}>
        <Title title={"צור קשר"} />
        <AppForm
          validationSchema={ContactValidation}
          onSubmit={(values) => alert(JSON.stringify(values))}
          initialValues={{
            subject: "",
            content: "",
          }}
        >
          <AppStack direction={"column"}>
            <FormFiled name={"subject"} label={"נושא הפניה"} />
            <FormFiled
              multiline={true}
              rows={4}
              name={"content"}
              label={"תוכן הפניה"}
            />
            <SubmitButton label={"שלח"} />
          </AppStack>
        </AppForm>
      </CenterLayout>
    </>
  );
}

export default Contact;
