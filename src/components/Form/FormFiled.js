import React from "react";
import { Field, useFormikContext } from "formik";
import TextInput from "../Inputs/TextInput";
function FormFiled({ placeholder, id, name, type,label, ...otherProps }) {
  const { handleChange, errors, touched } = useFormikContext();
  return (
    <TextInput
      id={id}
      name={name}
      type={type}
      label={label}
      error={touched[name] && errors[name]}
      onChange={handleChange}
      helperText={touched[name] && errors[name]}
      placeholder={placeholder}
      {...otherProps}
    />
  );
}

export default FormFiled;
