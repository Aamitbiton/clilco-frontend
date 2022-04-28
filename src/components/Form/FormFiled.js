import React from "react";
import { useFormikContext } from "formik";
import TextInput from "../Inputs/TextInput";
function FormFiled({
  placeholder,
  id,
  name,
  type,
  width,
  label,
  trim,
  defaultValue,
  ...otherProps
}) {
  const { handleChange, errors, touched } = useFormikContext();
  return (
    <TextInput
      id={id}
      width={width}
      defaultValue={defaultValue}
      name={name}
      type={type}
      label={label}
      error={touched[name] && errors[name]}
      onChange={(e) => {
        if (trim) e.target.value = e.target.value.trim();
        handleChange(e);
      }}
      helperText={touched[name] && errors[name]}
      placeholder={placeholder}
      {...otherProps}
    />
  );
}

export default FormFiled;
