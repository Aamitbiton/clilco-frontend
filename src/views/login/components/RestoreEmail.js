import React, { useState } from "react";
import Title from "../../../components/title/title";
import AppForm from "../../../components/Form/AppForm";
import FormFiled from "../../../components/Form/FormFiled";
import { phoneSchema } from "../../verifyPhone/SchemaValidation";
import SubmitButton from "../../../components/Form/SubmitButton";
import AppStack from "../../../components/AppStack";
import Text from "../../../components/Text";
import { restore_email_by_phone } from "../../../store/auth/authFunctions";
function RestoreEmail(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [emailVisible, setEmailVisible] = useState(false);
  const handle_submit = async ({ phoneNumber }) => {
    setIsLoading(true);
    const res = await restore_email_by_phone(phoneNumber);
    if (res?.success) {
      setEmailAddress(res.email);
    } else setEmailAddress("לא נמצא מייל תואם למספר הנייד שהוזן");
    setEmailVisible(true);
    setIsLoading(false);
  };
  return (
    <>
      <Title title={"שחזור אימייל"} textAlign={"center"} />
      <AppForm
        initialValues={{
          phoneNumber: "",
        }}
        onSubmit={handle_submit}
        validationSchema={phoneSchema}
      >
        <AppStack direction={"column"}>
          <FormFiled
            label={"הזן את מספר הנייד שאומת במערכת"}
            name={"phoneNumber"}
          />
          <SubmitButton label={"שלח"} loadingButton loading={isLoading} />
        </AppStack>
        {emailVisible && <Text>{emailAddress}</Text>}
      </AppForm>
    </>
  );
}

export default RestoreEmail;
