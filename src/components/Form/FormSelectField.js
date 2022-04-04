import React from "react";
import { useFormikContext } from "formik";
import AppSelect from "../Inputs/AppSelect";
function FormSelectField({ name, value, label, options }) {
  const { setFieldValue, errors, touched } = useFormikContext();
  const verifyValue = (inputValue) => {
    return typeof inputValue === "object" ? inputValue.value : inputValue;
  };
  return (
    <AppSelect
      value={value}
      label={label}
      name={name}
      handleChange={(e) => {
        const value = verifyValue(e.target.value);
        setFieldValue(name, value);
      }}
      options={options}
      error={touched[name] && errors[name]}
    />
  );
}

export default FormSelectField;
