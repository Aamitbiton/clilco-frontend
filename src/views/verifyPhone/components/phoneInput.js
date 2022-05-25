import React, { useEffect, useState } from "react";
import "../verifyPhone.css";
import LoadingButton from "@mui/lab/LoadingButton";
import AppForm from "../../../components/Form/AppForm";
import FormFiled from "../../../components/Form/FormFiled";
import AppStack from "../../../components/AppStack";
import { phoneSchema } from "../SchemaValidation";
import CenterLayout from "../../../components/CenterLayout";
import SubmitButton from "../../../components/Form/SubmitButton";
import defaultStyles from "../../../style/defaultStyles";
import { Checkbox } from "@mui/material";
import Text from "../../../components/Text";
import { Link } from "react-router-dom";
import AppRoutes from "../../../app/AppRoutes";
import Privacy from "../../privacy/Privacy";

export const PhoneInput = ({ smsSent }) => {
  const { inputs } = defaultStyles;
  const [Loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    await smsSent(values.phoneNumber);
    setLoading(false);
  };

  return (
    <>
      <AppForm
        initialValues={{
          phoneNumber: "",
        }}
        validationSchema={phoneSchema}
        onSubmit={handleSubmit}
      >
        <AppStack direction={"column"} spacing={2}>
          <FormFiled
            width={inputs.STATIC_WIDTH}
            label={"הכנס מספר טלפון"}
            name={"phoneNumber"}
          />
          <SubmitButton
            width={inputs.STATIC_WIDTH}
            loadingButton={true}
            loading={Loading}
            label={"שלח קוד"}
          />
        </AppStack>
      </AppForm>
    </>
  );
};

export default PhoneInput;
