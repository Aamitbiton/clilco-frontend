import React, { useState } from "react";
import "./addImage.css";
import FilePiker from "../../components/Inputs/FilePicker";
import {
  convertToBase64,
  filterOnlyImages,
  IMAGE_FILE_PICKER_ERROR_MESSAGE,
} from "../../utils/images";
import Image from "../../components/Image";
import { Button } from "@mui/material";
import { upload_profile_image } from "../../store/user/userFunctions";
import CenterLayout from "../../components/CenterLayout";
import Title from "../../components/title/title";
import AppButton from "../../components/Buttons/AppButton";
import defaultStyles from "../../style/defaultStyles";
import AppStack from "../../components/AppStack";
import LoadingButton from "@mui/lab/LoadingButton";

export const AddImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const handleSetImage = async (imageFile) => {
    const base64 = await convertToBase64(imageFile);
    setImage(base64);
  };
  const removeImage = () => {
    setImage(null);
  };

  const handle_upload_profile_image = async () => {
    setIsLoading(true);
    await upload_profile_image(image);
    setTimeout(() => setIsLoading(false), 3000);
  };
  return (
    <CenterLayout direction={"column"}>
      <Title title={"התמונה שלי"} />
      <Image removeImage={image && removeImage} src={image} alt={"image-url"} />
      <AppStack direction={"column"} spacing={2} margin={2}>
        <FilePiker
          title={"בחר תמונה"}
          onChange={handleSetImage}
          rules={filterOnlyImages}
          errorMessage={IMAGE_FILE_PICKER_ERROR_MESSAGE}
        />
        <LoadingButton
          onClick={handle_upload_profile_image}
          loading={isLoading}
          style={{ width: defaultStyles.inputs.STATIC_WIDTH }}
          variant={"outlined"}
          color={"secondary"}
          disabled={!image}
        >
          העלה תמונה
        </LoadingButton>
      </AppStack>
    </CenterLayout>
  );
};
