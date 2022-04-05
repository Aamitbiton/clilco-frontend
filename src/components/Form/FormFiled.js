import React from "react";
import { useFormikContext } from "formik";
import TextInput from "../Inputs/TextInput";
function FormFiled({ placeholder, id, name, type,width, label, ...otherProps }) {
  const { handleChange, errors, touched } = useFormikContext();
  return (
    <TextInput
      id={id}
      width={width}
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
