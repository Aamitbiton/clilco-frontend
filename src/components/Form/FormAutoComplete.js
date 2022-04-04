import React from "react";
import AppAutoComplete from "../Inputs/AppAutoComplete";
import { useFormikContext } from "formik";
function FormAutoComplete({ name, options }) {
  const { setFieldValue, errors, touched } = useFormikContext();
  const handleInputValue = () => {};
  return (
    <AppAutoComplete
      options={options}
      onChange={(e, v) => console.log({ e, v })}
      renderInput={(object) => {
        console.log(object);
      }}
      error={touched[name] && errors[name]}
    />
  );
}

export default FormAutoComplete;
