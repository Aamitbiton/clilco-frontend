import { useFormikContext } from "formik";
import AppButton from "../Buttons/AppButton";
import LoadingButton from "@mui/lab/LoadingButton";
function SubmitButton({
  label,
  endIcon,
  loading,
  width,
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
          sx={{ width }}
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
