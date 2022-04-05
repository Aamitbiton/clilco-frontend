import React from "react";
import TextField from "@mui/material/TextField";

function TextInput({
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
    backgroundColor: "#fff",
    borderRadius: 5,
    width
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
