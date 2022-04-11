import React, { useState } from "react";
import AppForm from "../../../components/Form/AppForm";
import * as Yup from "yup";
import FormFiled from "../../../components/Form/FormFiled";
import SubmitButton from "../../../components/Form/SubmitButton";
import AppStack from "../../../components/AppStack";
import { resetPassword } from "../../../store/auth/authFunctions";
import Text from "../../../components/Text";
function ResetPassword(props) {
  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
  });
  const [resultMessage, setResultMessage] = useState(null);
  const handleResetPassword = async (email) => {
    const res = await resetPassword(email);
    res
      ? setResultMessage({
          error: false,
          message: " שחזור הסיסמא נשלח בהצלחה!",
        })
      : setResultMessage({ error: true, message: "המייל אינו קיים" });
  };
  return (
    <AppForm
      validationSchema={validationSchema}
      initialValues={{ email: "" }}
      onSubmit={({ email }) => handleResetPassword(email)}
    >
      <AppStack direction={"column"} margin={2}>
        <FormFiled name={"email"} label={"אימייל"} />
        <SubmitButton width={50} label={"שלח"} />
      </AppStack>
      {resultMessage && (
        <Text
          color={resultMessage.error ? "error" : "primary"}
          align={"center"}
        >
          {resultMessage.message}
        </Text>
      )}
    </AppForm>
  );
}

export default ResetPassword;
