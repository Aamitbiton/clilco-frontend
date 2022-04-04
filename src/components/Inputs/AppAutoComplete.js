import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { FormHelperText, TextField } from "@mui/material";
function AppAutoComplete({ options, error, onChange }) {
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
        onChange={onChange}
        options={options}
      />
      <FormHelperText error={!!error}>{error}</FormHelperText>
    </>
  );
}

export default AppAutoComplete;
