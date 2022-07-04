import React, { useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import { send_report } from "../../store/user/userFunctions";
import { toast } from "react-toastify";
import AppRoutes from "../../app/AppRoutes";

function ReportUser() {
  const [loading, setIsLoading] = useState(false);
  const reporter_public_data = useSelector((s) => s.user.user.public);
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state?.report?.room;
  const caller = room?.caller;
  const answerer = room?.answerer;

  const [reported_uid, set_reported_uid] = useState(null);

  const handle_reported_uid = () => {
    const get_reported_uid =
      reporter_public_data.id === caller?.id ? answerer?.id : caller?.id;
    set_reported_uid(get_reported_uid);
  };
  useEffect(() => {
    handle_reported_uid();
    return () => {
      delete location.state.report;
    };
  }, []);
  const handle_submit = async (report) => {
    if (!reported_uid) {
      alert("שגיאה: הדיווח נכשל");
      navigate(AppRoutes.ROOT);
    }
    setIsLoading(true);
    const report_data = { report, reported_uid, reporter_public_data };
    const sending_report = await send_report(report_data);
    if (sending_report) {
      toast("הדווח נקלט בהצלחה!", { type: "success" });
    } else {
      alert("שגיאה: הדיווח נכשל.. פנה לתמיכה.");
    }
    setIsLoading(false);
    navigate(AppRoutes.LOBBY);
  };
  const reasons = [
    "התנהגות שאינה הולמת",
    "הטרדה",
    "דיבור אינו מכבד",
    "אלימות",
    "אחר",
  ];
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
