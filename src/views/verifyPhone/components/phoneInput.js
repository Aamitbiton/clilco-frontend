import React, { useState } from "react";
import "../verifyPhone.css";
import LoadingButton from "@mui/lab/LoadingButton";
import AppForm from "../../../components/Form/AppForm";
import FormFiled from "../../../components/Form/FormFiled";
import AppStack from "../../../components/AppStack";
import { phoneSchema } from "../SchemaValidation";
import CenterLayout from "../../../components/CenterLayout";

export const PhoneInput = ({ smsSent }) => {
  const [Loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    await smsSent(values.phoneNumber);
    setLoading(false);
  };

  return (
    <CenterLayout>
      <AppForm
        initialValues={{
          phoneNumber: "",
        }}
        validationSchema={phoneSchema}
        onSubmit={handleSubmit}
      >
        <AppStack direction={"column"} spacing={2}>
          <FormFiled
            width={270}
            label={"הכנס מספר טלפון"}
            name={"phoneNumber"}
          />
          <LoadingButton
            className="submit-btn"
            type="submit"
            loading={Loading}
            variant="contained"
          >
            שלח קוד
          </LoadingButton>
        </AppStack>
      </AppForm>
    </CenterLayout>
  );
};

export default PhoneInput;
