import React, { useState } from "react";
import "./addImage.css";
import FilePiker from "../../components/Inputs/FilePicker";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {
  convertToBase64,
  filterOnlyImages,
  IMAGE_FILE_PICKER_ERROR_MESSAGE,
} from "../../utils/images";
import Image from "../../components/Image";
import { upload_profile_image } from "../../store/user/userFunctions";
import CenterLayout from "../../components/CenterLayout";
import Title from "../../components/title/title";
import defaultStyles from "../../style/defaultStyles";
import AppStack from "../../components/AppStack";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";

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
    setIsLoading(false);
  };
  return (
    <CenterLayout direction={"column"}>
      <Title title={"התמונה שלי"} />
      <Typography textAlign={"center"} lineHeight={2}>
        להעלות תמונה טובה שלך עם פנים גלויות (תמונה שווה אלף מילים),
        <br />
        תמונות שלא יעמדו בכללים יוסרו או תוסר ההרשמה
      </Typography>
      {image ? (
        <Image
          removeImage={image && removeImage}
          src={image}
          alt={"image-url"}
        />
      ) : (
        <ImageBanner />
      )}
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
          שמור תמונה
        </LoadingButton>
      </AppStack>
    </CenterLayout>
  );
};

const ImageBanner = () => {
  const style = {
    fontSize: 120,
    padding: 20,
    border: "1px solid white",
  };
  return (
    <div style={style}>
      <AccountCircleOutlinedIcon fontSize={"inherit"} />
    </div>
  );
};
