import React, { useEffect, useState } from "react";
import "./registrationForm.css";
import AppForm from "../../components/Form/AppForm";
import registrationSchema from "./validationSchema";
import SubmitButton from "../../components/Form/SubmitButton";
import FormFiled from "../../components/Form/FormFiled";
import AppStack from "../../components/AppStack";
import { days, getBirthdayTime, months, years } from "../../utils/dates";
import FormSelectField from "../../components/Form/FormSelectField";
import { gender, religion } from "./FormOptions";
import FormAutoComplete from "./CitiesAutoComplete";
import Title from "../../components/title/title";
import { set_user_details } from "../../store/user/userFunctions";
import AppModal from "../../components/AppModal";
import RestoreTiptopUser from "./RestoreTiptopUser/RestoreTiptopUser";
import { useSelector, useDispatch } from "react-redux";
import USER_CONSTANTS from "../../store/user/constants";
const largeInput = 270;
const midInput = 125;
const smallInput = 80;

export const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const tipTopUser = useSelector((s) => s.user.temp_user);
  useEffect(() => tipTopUser?.name && setModalVisible(true), [tipTopUser]);
  const onCloseModalHandler = () =>
    dispatch({
      type: USER_CONSTANTS.SET_TEMP_USER,
      payload: {},
    });

  const handleSubmit = async (values) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const accept_tiptop_details = async () => {
    setIsLoading(true);
    setModalVisible(false);
    await set_user_details(tipTopUser);
    setIsLoading(false);
  };

  return (
    <div className={"full-height flex-column-center"}>
      <Title title={"?????????? ????????????"} />
      <AppModal
        modalVisible={modalVisible}
        lockBackdrop={true}
        setModalVisible={(val) => setModalVisible(val)}
        onCloseHandler={onCloseModalHandler}
      >
        {tipTopUser?.name && (
          <RestoreTiptopUser
            acceptIntegration={accept_tiptop_details}
            closeModal={() => setModalVisible(false)}
            user={tipTopUser}
          />
        )}
      </AppModal>

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
            <FormFiled label={"???? ????????"} width={largeInput} name={"name"} />
          </AppStack>
          <AppStack margin={1}>
            <FormSelectField
              name={"gender"}
              width={midInput}
              label={"??????"}
              options={gender}
            />
            <FormSelectField
              name={"wanted"}
              width={midInput}
              label={"???????? ??????????"}
              options={gender}
            />
          </AppStack>
          <AppStack margin={1}>
            <Title
              underline={true}
              mb={0}
              mt={0}
              fontSize={20}
              title={"?????????? ????????"}
            />
          </AppStack>
          <AppStack>
            <FormSelectField
              width={smallInput}
              name={"day"}
              label={"??????"}
              options={days}
            />
            <FormSelectField
              width={smallInput}
              name={"month"}
              label={"????????"}
              options={months}
            />
            <FormSelectField
              width={smallInput}
              name={"year"}
              label={"??????"}
              options={years}
            />
          </AppStack>
          <AppStack margin={3} direction={"column"}>
            <FormSelectField
              width={largeInput}
              label={"????"}
              name={"religion"}
              options={religion}
            />
            <FormAutoComplete width={largeInput} name={"city"} />
          </AppStack>
          <SubmitButton
            width={270}
            loading={isLoading}
            loadingButton={true}
            customIcon={false}
            label={"????????"}
          />
        </div>
      </AppForm>
    </div>
  );
};
