import React from "react";
import { Field, useFormikContext } from "formik";
import TextInput from "../TextInput";
function FormFiled({ placeholder, id, name, type, otherProps }) {
  const { handleChange, errors, touched } = useFormikContext();
  return (
    <TextInput
      id={id}
      name={name}
      type={type}
      error={touched[name] && errors[name]}
      onChange={handleChange}
      helperText={touched[name] && errors[name]}
      placeholder={placeholder}
      {...otherProps}
    />
  );
}

export default FormFiled;
