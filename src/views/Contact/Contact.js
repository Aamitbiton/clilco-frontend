import React, { useEffect, useState } from "react";
import CenterLayout from "../../components/CenterLayout";
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
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function Contact(props) {
  const location = useLocation();
  const { inputs } = defaultStyles;
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const user = useSelector((s) => s.user.user);
  const tranlate = useSelector((s) => s.app.global_hooks.translate);
  const SUCCESS_MESSAGE = "פנייתך נתקבלה בהצלחה.";
  const handleSubmit = async (values) => {
    setIsLoading(true);
    const res = await send_contact_form({ user, ...values });
    res && (await toast(SUCCESS_MESSAGE, { type: "success" }));
    setIsLoading(false);
  };
  const created = async () => {
    load_initial_values();
  };
  const load_initial_values = () => {
    const report_data = {
      subject: tranlate("contact.report.subject"),
      content:
        tranlate("contact.report.content") +
        " " +
        location?.state?.report?.room?.id,
    };
    setInitialValues(
      location.state?.report?.room ? report_data : { subject: "", content: "" }
    );
  };
  useEffect(created, []);
  return (
    <>
      <Header />
      <CenterLayout direction={"column"}>
        <Title title={"צור קשר"} />
        {initialValues && (
          <AppForm
            validationSchema={ContactValidation}
            onSubmit={handleSubmit}
            initialValues={initialValues}
          >
            <AppStack direction={"column"}>
              <FormFiled
                defaultValue={initialValues.subject}
                width={inputs.LARGE_INPUT_WIDTH}
                name={"subject"}
                label={"נושא הפניה"}
              />
              <FormFiled
                defaultValue={initialValues.content}
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
        )}
      </CenterLayout>
    </>
  );
}

export default Contact;
