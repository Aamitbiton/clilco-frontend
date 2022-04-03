import * as Yup from "yup";

const registrationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export default registrationSchema;
