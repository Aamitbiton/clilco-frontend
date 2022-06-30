import * as Yup from "yup";
const MAIN_ERROR_MESSAGE = "שדה חובה";
const report_scheme = Yup.object().shape({
  reason: Yup.string().required(MAIN_ERROR_MESSAGE),
  content: Yup.string(),
});

export default report_scheme;
