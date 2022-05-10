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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Title from "../../../components/title/title";
import CenterLayout from "../../../components/CenterLayout";
import defaultStyles from "../../../style/defaultStyles";
import AppLogo from "../../../components/AppLogo";
function LoginWithEmail({ close }) {
  const { inputs } = defaultStyles;
  const handleLoginWithEmail = async ({ email, password }) => {
    const res = await login_with_email({ email, password });
    if (res.error) {
      const errorMessage = handleErrorMessage(res.message);
      res.error && setErrorMessage(errorMessage);
    }
    return res;

    function handleErrorMessage(message) {
      const wrongPassword = new RegExp(/wrong-password/g).test(message);
      if (wrongPassword) {
        return "סיסמא שגויה";
      }
    }
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });
  return (
    <CenterLayout direction={"column"}>
      <AppLogo />

      <AppIconButton
        onClick={close}
        style={{ position: "relative", left: inputs.STATIC_WIDTH / 2 }}
      >
        <ArrowForwardIcon color={"primary"} />
      </AppIconButton>
      <Title mt={2} title={"התחברות עם אימייל"} />
      <AppForm
        validationSchema={schema}
        onSubmit={async ({ email, password }) => {
          setIsLoading(true);
          const res = await handleLoginWithEmail({ email, password });
          res.error && setIsLoading(false);
        }}
        initialValues={{
          email: "",
          password: "",
        }}
      >
        <AppStack direction={"column"}>
          <FormFiled
            data_cy="login-email-input"
            trim={true}
            label={"אימייל"}
            name={"email"}
            width={inputs.STATIC_WIDTH}
          />
          <FormFiled
            data_cy="login-pass-input"
            label={"סיסמא"}
            type={"password"}
            trim={true}
            name={"password"}
            width={inputs.STATIC_WIDTH}
          />
          <Text
            onClick={() => setModalVisible(true)}
            sx={{ cursor: "pointer", textDecoration: "underline" }}
          >
            שכחתי סיסמא
          </Text>
          <SubmitButton
            width={inputs.STATIC_WIDTH}
            loadingButton={true}
            loading={isLoading}
            label={"הכנס"}
          />
          <AppStack margin={1}>
            <Text color={"error"}>{errorMessage}</Text>
          </AppStack>
        </AppStack>
      </AppForm>
      {modalVisible && (
        <AppModal
          modalVisible={modalVisible}
          setModalVisible={(val) => setModalVisible(val)}
        >
          <ResetPassword />
        </AppModal>
      )}
    </CenterLayout>
  );
}

export default LoginWithEmail;
