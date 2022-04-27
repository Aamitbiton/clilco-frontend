import React, { useRef } from "react";
import { toast } from "react-toastify";
import Image from "../../components/Image";
import AppButton from "../Buttons/AppButton";
import defaultStyles from "../../style/defaultStyles";
import AppToastContainer from "../Toast/AppToastContainer";
function FilePiker({
  onChange,
  title = "add file",
  imgPicker = false,
  src,
  rules,
  errorMessage,
  className,
}) {
  const file = useRef(null);
  const handleFilePiker = ([file]) => {
    if (rules(file)) onChange(file);
    else toast(errorMessage, { type: "error" });
  };
  return (
    <div>
      <AppToastContainer />
      {imgPicker ? (
        <Image onClick={() => file.current.click()} src={src} />
      ) : (
        <AppButton
          className={className}
          rounded={false}
          width={defaultStyles.inputs.STATIC_WIDTH}
          label={title}
          onClick={() => file.current.click()}
        />
      )}
      <input
        type={"file"}
        onChange={() => handleFilePiker(file.current.files)}
        className={"display-none"}
        ref={file}
      />
    </div>
  );
}

export default FilePiker;
