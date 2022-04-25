import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

function AppSelect({
  width,
  label,
  options,
  handleChange,
  defaultValue = "",
  value,
  error,
}) {
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        defaultValue={defaultValue}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        style={{
          width,
        }}
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
