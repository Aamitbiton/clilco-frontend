import React, { useState } from "react";
import "./profile.css";
import { Header } from "../home/components/header/header";
import AppForm from "../../components/Form/AppForm";
import FormFiled from "../../components/Form/FormFiled";
import CenterLayout from "../../components/CenterLayout";
import SubmitButton from "../../components/Form/SubmitButton";
import { useSelector } from "react-redux";
import Title from "../../components/title/title";
import FormSelectField from "../../components/Form/FormSelectField";
import { gender, religion } from "../registrationForm/FormOptions";
import AppStack from "../../components/AppStack";
import profileValidationSchema from "./profileValidationSchema";
import FormAutoComplete from "../registrationForm/CitiesAutoComplete";
import {
  set_user_details,
  upload_profile_image,
} from "../../store/user/userFunctions";
import FilePiker from "../../components/Inputs/FilePicker";
import {
  convertToBase64,
  filterOnlyImages,
  IMAGE_FILE_PICKER_ERROR_MESSAGE,
} from "../../utils/images";
import { toast } from "react-toastify";

export const Profile = () => {
  const user = useSelector((s) => s.user.user.public);
  const largeInput = 270;
  const midInput = 125;
  const [newImage, setNewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleNewImage = async (file) => {
    const base64 = await convertToBase64(file);
    setNewImage(base64);
  };
  const handleUploadImage = async () => {
    newImage && (await upload_profile_image(newImage));
  };

  const SUCCESS_MESSAGE = "העדכון בוצע בהצלחה!";
  const ERROR_MESSAGE = "ארעה שגיאה..";
  return (
    <>
      <Header />
      <CenterLayout direction={"column"}>
        <Title title={"פרופיל אישי"} />
        {user.id && (
          <AppForm
            validationSchema={profileValidationSchema}
            onSubmit={async (values) => {
              setIsLoading(true);
              try {
                await set_user_details(values);
                await handleUploadImage();
                toast(SUCCESS_MESSAGE, { type: "success" });
              } catch (e) {
                toast(ERROR_MESSAGE, { type: "error" });
              }
              setIsLoading(false);
            }}
            initialValues={{
              name: user.name,
              gender: user.gender,
              wanted: user.wanted,
              religion: user.religion,
              city: user.city,
            }}
          >
            <div className={"flex-column-center"}>
              <FilePiker
                onChange={handleNewImage}
                rules={(file) => filterOnlyImages(file)}
                imgPicker={true}
                errorMessage={IMAGE_FILE_PICKER_ERROR_MESSAGE}
                src={newImage ? newImage : user.imgUrl.url}
              />
              <AppStack>
                <FormFiled
                  defaultValue={user.name}
                  width={largeInput}
                  label={"שם פרטי"}
                  name={"name"}
                />
              </AppStack>
              <AppStack margin={1}>
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
              <AppStack margin={1} direction={"column"}>
                <FormSelectField
                  width={largeInput}
                  label={"דת"}
                  name={"religion"}
                  options={religion}
                />
                <FormAutoComplete width={largeInput} name={"city"} />
              </AppStack>
              <SubmitButton
                loadingButton={true}
                loading={isLoading}
                width={largeInput}
                label={"עדכן"}
              />
            </div>
          </AppForm>
        )}
      </CenterLayout>
    </>
  );
};
