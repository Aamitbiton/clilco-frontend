import * as Yup from "yup";
const MAIN_ERROR_MESSAGE = "שדה חובה";
const profileValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "לא פחות מ2 תוים")
    .max(10, "עד 10 תוים")
    .required(MAIN_ERROR_MESSAGE),
  religion: Yup.string().required(MAIN_ERROR_MESSAGE),
  city: Yup.object().typeError(MAIN_ERROR_MESSAGE).required(MAIN_ERROR_MESSAGE),
  wanted: Yup.string().required(MAIN_ERROR_MESSAGE),
  gender: Yup.string().required(MAIN_ERROR_MESSAGE),
});

export default profileValidationSchema;
