import * as Yup from "yup";
import "yup-phone";
const ERROR_MESSAGE = "המספר אינו תקין";
export const phoneSchema = Yup.object().shape({
  phoneNumber: Yup.string().phone("il").required(ERROR_MESSAGE),
});

export const codeSchema = Yup.object().shape({
  code: Yup.string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .length(4),
});
