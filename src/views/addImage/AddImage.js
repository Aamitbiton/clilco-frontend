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

export const AddImage = () => {
  const [image, setImage] = useState(null);
  const handleSetImage = async (imageFile) => {
    const base64 = await convertToBase64(imageFile);
    setImage(base64);
  };
  const removeImage = () => {
    setImage(null);
  };
  return (
    <div className={"add-image-page"}>
      {image && (
        <Image removeImage={removeImage} src={image} alt={"image-url"} />
      )}
      <FilePiker
        title={"add image"}
        onChange={handleSetImage}
        rules={filterOnlyImages}
        errorMessage={IMAGE_FILE_PICKER_ERROR_MESSAGE}
      />
      <Button
        disabled={!image}
        onClick={() => upload_profile_image(image)}
        variant={"contained"}
      >
        SUBMIT
      </Button>
    </div>
  );
};
