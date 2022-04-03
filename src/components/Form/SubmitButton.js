import { useFormikContext } from "formik";
import AppButton from "../AppButton";
function SubmitButton({ label, ...otherProps }) {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton {...otherProps} onClick={() => handleSubmit()} label={label} />
  );
}

export default SubmitButton;
