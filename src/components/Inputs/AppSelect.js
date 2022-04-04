import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

function AppSelect({
  label,
  options,
  handleChange,
  value,
  error,
  touched,
  name,
}) {
  const style = {
    minWidth: 100,
  };
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        defaultValue={""}
        style={style}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={handleChange}
      >
        {options?.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option.label ? option.label : option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={!!error}>{error}</FormHelperText>
    </FormControl>
  );
}

export default AppSelect;
