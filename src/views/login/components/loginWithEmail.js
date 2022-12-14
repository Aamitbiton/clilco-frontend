import React, { useEffect, useState } from "react";
import AppForm from "../../../components/Form/AppForm";
import * as Yup from "yup";
import FormFiled from "../../../components/Form/FormFiled";
import SubmitButton from "../../../components/Form/SubmitButton";
import Text from "../../../components/Text";
import AppModal from "../../../components/AppModal";
import ResetPassword from "./ResetPassword";
import { login_with_email } from "../../../store/auth/authFunctions";
import AppStack from "../../../components/AppStack";

import Title from "../../../components/title/title";
import CenterLayout from "../../../components/CenterLayout";
import defaultStyles from "../../../style/defaultStyles";
import AppLogo from "../../../components/AppLogo";

import Privacy from "../../privacy/Privacy";
import SimpleBottomNavigation from "./bottomNavigation";
import RestoreEmail from "./RestoreEmail";
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
  const [privacyVisible, setPrivacyVisible] = useState(false);
  const [navigationState, setNavigationState] = useState(0);
  const [restore_email_visible, set_restore_email_visible] = useState(false);
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).max(20).required(),
  });
  return (
    <CenterLayout direction={"column"}>
      <AppLogo />
      <SimpleBottomNavigation
        navigationState={navigationState}
        state={(state) => {
          setNavigationState(state);
        }}
      />

      {/*<AppIconButton*/}
      {/*  onClick={close}*/}
      {/*  style={{ position: "relative", left: inputs.STATIC_WIDTH / 2 }}*/}
      {/*>*/}
      {/*  <ArrowForwardIcon color={"primary"} />*/}
      {/*</AppIconButton>*/}
      <Title mt={2} title={navigationState === 0 ? "התחברות" : "יצירת חשבון"} />
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
            data_cy="login-password-input"
            label={navigationState === 0 ? "סיסמא" : "בחר סיסמא (לפחות 6 תוים)"}
            type={"password"}
            trim={true}
            name={"password"}
            width={inputs.STATIC_WIDTH}
          />
          <SubmitButton
            data_cy="login-with-email_login-btn"
            width={inputs.STATIC_WIDTH}
            loadingButton={true}
            loading={isLoading}
            label={"הכנס"}
          />
          <AppStack margin={1}>
            <Text color={"error"}>{errorMessage}</Text>
          </AppStack>
          {navigationState === 0 && (
            <AppStack justifyContent={"center"}>
              <Text
                onClick={() => setModalVisible(true)}
                className={"pointer privacy"}
              >
                שכחת סיסמא?
              </Text>
              <Text
                onClick={() => set_restore_email_visible(true)}
                className={"pointer privacy"}
              >
                שכחת אימייל?
              </Text>
            </AppStack>
          )}
        </AppStack>
      </AppForm>
      <Text>
        בלחיצה על הכפתור את/ה מאשר/ת את
        <span
          onClick={() => setPrivacyVisible(true)}
          className={"privacy pointer"}
        >
          תנאי השימוש
        </span>
      </Text>
      <Privacy onClick={() => setPrivacyVisible(false)} show={privacyVisible} />
      {modalVisible && (
        <AppModal
          modalVisible={modalVisible}
          setModalVisible={(val) => setModalVisible(val)}
        >
          <ResetPassword />
        </AppModal>
      )}
      {restore_email_visible && (
        <AppModal
          modalVisible={restore_email_visible}
          setModalVisible={(val) => set_restore_email_visible(val)}
        >
          <RestoreEmail />
        </AppModal>
      )}
    </CenterLayout>
  );
}

export default LoginWithEmail;
