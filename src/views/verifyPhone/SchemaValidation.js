import * as Yup from "yup";
import "yup-phone";
export const phoneSchema = Yup.object().shape({
  phoneNumber: Yup.string().phone("il").required(),
});

export const codeSchema = Yup.object().shape({
  code: Yup.string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .length(4),
});
