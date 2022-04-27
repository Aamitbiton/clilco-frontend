import React, { useState } from "react";
import CenterLayout from "../../components/CenterLayout";
import Typography from "@mui/material/Typography";
import { Header } from "../home/components/header/header";
import Title from "../../components/title/title";
import AppForm from "../../components/Form/AppForm";
import AppStack from "../../components/AppStack";
import FormFiled from "../../components/Form/FormFiled";
import SubmitButton from "../../components/Form/SubmitButton";
import ContactValidation from "./contactValidation";
import { send_contact_form } from "../../store/user/userFunctions";
import { useSelector } from "react-redux";
import defaultStyles from "../../style/defaultStyles";
import AppToastContainer from "../../components/Toast/AppToastContainer";
import { toast } from "react-toastify";

function Contact(props) {
  const inputWidth = 270;
  const { inputs } = defaultStyles;
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((s) => s.user.user);
  const SUCCESS_MESSAGE = "פנייתך נתקבלה בהצלחה.";
  const ERROR_MESSAGE = "ארעה שגיאה..";
  const handleSubmit = async (values) => {
    setIsLoading(true);
    const res = await send_contact_form({ user, ...values });
    res && (await toast(SUCCESS_MESSAGE, { type: "success" }));
    setIsLoading(false);
  };
  return (
    <>
      <Header />
      <AppToastContainer />
      <CenterLayout direction={"column"}>
        <Title title={"צור קשר"} />
        <AppForm
          validationSchema={ContactValidation}
          onSubmit={handleSubmit}
          initialValues={{
            subject: "",
            content: "",
          }}
        >
          <AppStack direction={"column"}>
            <FormFiled
              width={inputs.LARGE_INPUT_WIDTH}
              name={"subject"}
              label={"נושא הפניה"}
            />
            <FormFiled
              width={inputs.LARGE_INPUT_WIDTH}
              multiline={true}
              rows={7}
              name={"content"}
              label={"תוכן הפניה"}
            />
            <SubmitButton
              loadingButton={true}
              loading={isLoading}
              width={inputs.LARGE_INPUT_WIDTH}
              label={"שלח"}
            />
          </AppStack>
        </AppForm>
      </CenterLayout>
    </>
  );
}

export default Contact;
