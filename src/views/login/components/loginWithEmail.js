import React, { useState } from "react";
import AppForm from "../../../components/Form/AppForm";
import * as Yup from "yup";
import FormFiled from "../../../components/Form/FormFiled";
import SubmitButton from "../../../components/Form/SubmitButton";
import Text from "../../../components/Text";
import AppModal from "../../../components/AppModal";
import ResetPassword from "./ResetPassword";
import { login_with_email } from "../../../store/auth/authFunctions";
import AppStack from "../../../components/AppStack";
import AppIconButton from "../../../components/Buttons/AppIconButton";
import CloseIcon from "@mui/icons-material/Close";
function LoginWithEmail({ close }) {
  const flex = {
    display: "flex",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
  };
  const handleLoginWithEmail = async ({ email, password }) => {
    const res = await login_with_email({ email, password });
    res.error && setErrorMessage(res.message);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });
  return (
    <React.Fragment>
      <AppIconButton onClick={close}>
        <CloseIcon color={"primary"} />
      </AppIconButton>
      <AppForm
        validationSchema={schema}
        onSubmit={({ email, password }) =>
          handleLoginWithEmail({ email, password })
        }
        initialValues={{
          email: "",
          password: "",
        }}
      >
        <div style={flex}>
          <FormFiled label={"אימייל"} name={"email"} />
          <FormFiled label={"סיסמא"} name={"password"} />
          <Text
            onClick={() => setModalVisible(true)}
            sx={{ cursor: "pointer", textDecoration: "underline" }}
          >
            שכחתי סיסמא
          </Text>
          <SubmitButton label={"הכנס"} />
          <AppStack margin={1}>
            <Text color={"error"}>{errorMessage}</Text>
          </AppStack>
        </div>
      </AppForm>
      <AppModal
        modalVisible={modalVisible}
        setModalVisible={(val) => setModalVisible(val)}
      >
        <ResetPassword />
      </AppModal>
    </React.Fragment>
  );
}

export default LoginWithEmail;
