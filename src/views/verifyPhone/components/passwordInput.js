import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import * as Yup from "yup";
import "yup-phone";
import "../verifyPhone.css";
import AppForm from "../../../components/Form/AppForm";
import FormFiled from "../../../components/Form/FormFiled";
import CenterLayout from "../../../components/CenterLayout";
import AppStack from "../../../components/AppStack";
import { codeSchema } from "../SchemaValidation";
import SubmitButton from "../../../components/Form/SubmitButton";

function PasswordInput({ checkPassword, sendSmsAgain }) {
  const [Loading, setLoading] = useState(false);
  const [sendAgainLoading, setSendAgainLoading] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    await checkPassword(values.code);
    setLoading(false);
  };
  const send_sms_again = async () => {
    setSendAgainLoading(true);
    await sendSmsAgain();
    setSendAgainLoading(false);
  };
  return (
    <AppForm
      initialValues={{ code: "" }}
      validationSchema={codeSchema}
      onSubmit={handleSubmit}
    >
      <AppStack direction={"column"}>
        <FormFiled name={"code"} label={"הזן את הקוד שקיבלת"} />
        <SubmitButton loadingButton={true} loading={Loading} label={"אישור"} />
        {/*<LoadingButton type="submit" loading={Loading} variant="contained">*/}
        {/*  אישור*/}
        {/*</LoadingButton>*/}
        <LoadingButton
          className="submit-btn"
          onClick={() => send_sms_again()}
          loading={sendAgainLoading}
          variant="flat"
        >
          שלח שוב
        </LoadingButton>
      </AppStack>
    </AppForm>
  );
}

export default PasswordInput;
