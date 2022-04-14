import { useFormikContext } from "formik";
import AppButton from "../Buttons/AppButton";
import LoadingButton from "@mui/lab/LoadingButton";
function SubmitButton({
  label,
  endIcon,
  loading,
  loadingButton = false,
  ...otherProps
}) {
  const { handleSubmit } = useFormikContext();
  return (
    <>
      {loadingButton ? (
        <LoadingButton
          onClick={() => handleSubmit()}
          loading={loading}
          variant={"outlined"}
          {...otherProps}
        >
          {label}
        </LoadingButton>
      ) : (
        <AppButton
          endIcon={endIcon}
          {...otherProps}
          onClick={() => handleSubmit()}
          label={label}
        />
      )}
    </>
  );
}

export default SubmitButton;
