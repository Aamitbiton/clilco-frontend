import { useFormikContext } from "formik";
import AppButton from "../Buttons/AppButton";
function SubmitButton({ label, endIcon, ...otherProps }) {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton
      endIcon={endIcon}
      {...otherProps}
      onClick={() => handleSubmit()}
      label={label}
    />
  );
}

export default SubmitButton;
