import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { FormHelperText, TextField } from "@mui/material";
function AppAutoComplete({
  options,
  error,
  onChange,
  label,
  width,
  defaultValue,
}) {
  return (
    <>
      <Autocomplete
        disablePortal
        defaultValue={defaultValue}
        id="combo-box-demo"
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={label} />}
        onChange={onChange}
        options={options}
        style={{
          width,
        }}
      />
      <FormHelperText error={!!error}>{error}</FormHelperText>
    </>
  );
}

export default AppAutoComplete;
