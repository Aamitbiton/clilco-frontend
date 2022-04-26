import * as Yup from "yup";
const MAIN_ERROR_MESSAGE = "שדה חובה";

const ContactValidation = Yup.object().shape({
  subject: Yup.string().min(10).max(25).required(MAIN_ERROR_MESSAGE),
  content: Yup.string().min(10).required(MAIN_ERROR_MESSAGE),
});

export default ContactValidation;
