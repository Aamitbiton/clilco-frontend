import React from "react";
import AppAutoComplete from "../../components/Inputs/AppAutoComplete";
import { useFormikContext } from "formik";
import { citiesNames, getCity } from "./cities";
function CitiesAutoComplete({ name, width }) {
  const { setFieldValue, errors, touched, values } = useFormikContext();
  const setCity = (event, value) => {
    const city = getCity(value);
    setFieldValue(name, city);
  };
  const getDefaultCity = () => {
    return values[name]?.name;
  };

  return (
    <AppAutoComplete
      defaultValue={getDefaultCity}
      label={"עיר מגורים"}
      options={citiesNames()}
      onChange={setCity}
      width={width}
      renderInput={(object) => {
        console.log(object);
      }}
      error={touched[name] && errors[name]}
    />
  );
}

export default CitiesAutoComplete;
