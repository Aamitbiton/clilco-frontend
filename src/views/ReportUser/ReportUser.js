import React, { useState } from "react";
import CenterLayout from "../../components/CenterLayout";
import AppForm from "../../components/Form/AppForm";
import FormFiled from "../../components/Form/FormFiled";
import FormSelectField from "../../components/Form/FormSelectField";
import SubmitButton from "../../components/Form/SubmitButton";
import Title from "../../components/title/title";
import report_scheme from "./report_scheme";
import defaultStyles from "../../style/defaultStyles";
import AppStack from "../../components/AppStack";
import { useSelector } from "react-redux";

function ReportUser() {
  const [loading, setIsLoading] = useState(false);
  const user_state = useSelector((s) => s.user);
  const handle_submit = (values) => {
    console.log(values + user_state.user.public);
  };
  const reasons = ["הופעה שאינה הולמת", "הטרדה", "דיבור אינו מכבד", "אלימות"];
  return (
    <CenterLayout direction={"column"}>
      <Title title={"דווח על משתמש"} />
      <AppForm
        validationSchema={report_scheme}
        initialValues={{
          reason: "",
          content: "",
        }}
        onSubmit={handle_submit}
      >
        <AppStack direction={"column"}>
          <FormSelectField
            name={"reason"}
            label={"סיבת הדווח"}
            width={defaultStyles.inputs.STATIC_WIDTH}
            options={reasons}
          />
          <FormFiled
            name={"content"}
            rows={7}
            multiline={true}
            label={"פרטים נוספים"}
          />
          <SubmitButton loading={loading} loadingButton={true} label={"שלח"} />
        </AppStack>
      </AppForm>
    </CenterLayout>
  );
}

export default ReportUser;
