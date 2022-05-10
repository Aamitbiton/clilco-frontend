import { useFormikContext } from "formik";
import AppButton from "../Buttons/AppButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useMemo } from "react";
function SubmitButton({
  data_cy,
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
          data_cy={data_cy}
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
          data_cy={data_cy}
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
