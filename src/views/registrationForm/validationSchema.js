import * as Yup from "yup";

const registrationSchema = Yup.object().shape({
  name: Yup.string().min(2).max(10).required(),
  day: Yup.string().required(),
  month: Yup.string().required(),
  year: Yup.string().required(),
  // religion: Yup.string().required(),
  // city: Yup.string().required(),
});

export default registrationSchema;
