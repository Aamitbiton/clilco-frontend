import React, { useRef } from "react";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function FilePiker({ onChange, title = "add file", rules, errorMessage }) {
  const file = useRef(null);
  const handleFilePiker = ([file]) => {
    if (rules(file)) onChange(file);
    else toast(errorMessage, { type: "error" });
  };
  return (
    <div>
      <div>
        <ToastContainer closeOnClick={true} draggable={true} />
      </div>
      <Button
        style={{ margin: 10 }}
        variant={"outlined"}
        onClick={() => file.current.click()}
      >
        {title}
      </Button>
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
