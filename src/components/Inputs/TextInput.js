import React from "react";
import TextField from "@mui/material/TextField";

function TextInput({
  onChange,
  placeholder,
  defaultValue,
  name,
  id,
  value,
  variant = "outlined",
  label = "label",
  error,
  helperText,
  margin = "dense",
  multiline = false,
  ...otherProps
}) {
  const style = {
    backgroundColor: "#fff",
    borderRadius: 5,
  };
  return (
    <TextField
      id={id}
      margin={margin}
      multiline={multiline}
      label={label}
      error={!!error}
      color={"appTurquoise"}
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
