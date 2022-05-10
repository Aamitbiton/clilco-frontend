import React from "react";
import TextField from "@mui/material/TextField";

function TextInput({
  data_cy,
  onChange,
  placeholder,
  defaultValue,
  width,
  name,
  id,
  value,
  variant = "outlined",
  label,
  error,
  helperText,
  margin = "dense",
  multiline = false,
  ...otherProps
}) {
  const style = {
    borderRadius: 5,
    width,
  };
  return (
    <TextField
      data_cy={data_cy}
      id={id}
      margin={margin}
      multiline={multiline}
      label={label}
      error={!!error}
      style={style}
      value={value}
      name={name}
      helperText={helperText}
      variant={variant}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...otherProps}
    />
  );
}

export default TextInput;
