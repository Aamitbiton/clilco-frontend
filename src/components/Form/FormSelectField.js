import React from "react";
import { useFormikContext } from "formik";
import AppSelect from "../Inputs/AppSelect";
function FormSelectField({ name, value, label, options, width }) {
  const { setFieldValue, errors, touched, values } = useFormikContext();
  const verifyValue = (inputValue) => {
    return typeof inputValue === "object" ? inputValue.value : inputValue;
  };
  const getDefaultValue = (value) => {
    return options.find((option) => option.value === value);
  };
  return (
    <AppSelect
      value={value}
      defaultValue={() => getDefaultValue(values[name])}
      width={width}
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
