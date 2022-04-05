import React from "react";
import "./registrationForm.css";
import AppForm from "../../components/Form/AppForm";
import registrationSchema from "./validationSchema";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import SubmitButton from "../../components/Form/SubmitButton";
import FormFiled from "../../components/Form/FormFiled";
import AppStack from "../../components/AppStack";
import { days, getBirthdayTime, months, years } from "../../utils/dates";
import FormSelectField from "../../components/Form/FormSelectField";
import { gender, religion } from "./FormOptions";
import FormAutoComplete from "./CitiesAutoComplete";
import Title from "../../components/title/title";
import { set_user_details } from "../../store/user/userFunctions";

const largeInput = 270;
const midInput = 125;
const smallInput = 80;

export const RegistrationForm = () => {
  const handleSubmit = async (values) => {
    const { day, month, year, name, religion, city, gender, wanted } = values;
    const birthday = getBirthdayTime({ day, month, year });
    const userDetails = {
      name,
      religion,
      city,
      birthday,
      gender,
      wanted,
    };
    await set_user_details(userDetails);
  };

  return (
    <div className={"full-height background-white flex-column-center"}>
      <Title title={"פרטים אישיים"} />
      <AppForm
        validationSchema={registrationSchema}
        onSubmit={(values) => handleSubmit(values)}
        initialValues={{
          name: "",
          day: "",
          month: "",
          year: "",
          religion: "",
          city: null,
          gender: "",
          wanted: "",
        }}
      >
        <div className={"flex-column-center"}>
          <AppStack>
            <FormFiled label={"שם פרטי"} width={largeInput} name={"name"} />
          </AppStack>
          <AppStack margin={2}>
            <FormSelectField
              name={"gender"}
              width={midInput}
              label={"אני"}
              options={gender}
            />
            <FormSelectField
              name={"wanted"}
              width={midInput}
              label={"מחפש להכיר"}
              options={gender}
            />
          </AppStack>
          <AppStack>
            <FormSelectField
              width={smallInput}
              name={"day"}
              label={"יום"}
              options={days}
            />
            <FormSelectField
              width={smallInput}
              name={"month"}
              label={"חודש"}
              options={months}
            />
            <FormSelectField
              width={smallInput}
              name={"year"}
              label={"שנה"}
              options={years}
            />
          </AppStack>
          <AppStack margin={3} direction={"column"}>
            <FormSelectField
              width={largeInput}
              label={"דת"}
              name={"religion"}
              options={religion}
            />
            <FormAutoComplete width={largeInput} name={"city"} />
          </AppStack>
          <SubmitButton
            color={"appTurquoise"}
            customIcon={false}
            startIcon={<ArrowLeftIcon />}
            label={"המשך"}
          />
        </div>
      </AppForm>
    </div>
  );
};
