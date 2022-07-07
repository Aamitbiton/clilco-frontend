import React, { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { reject_date } from "../../views/lobby/components/notes/NotesInstances";
import { MINUTE, SECOND } from "../../utils/dates";

function AppLoader({ props }) {
  if (!props?.text && window.location.href.includes("video-date")) {
    props = { text: "הדייט מיד ייטען, אנא המתן..." };
  }

  useEffect(() => {
    if (props?.timeOut) {
      const timer = setInterval(() => {
        console.log("want to refresh from loader");
        props.goBack();
      }, props.timeOut);
      return () => {
        clearInterval(timer);
      };
    }
  }, []);

  return (
    <div className={"full-screen flex-center column"}>
      <CircularProgress size={100} />
      {props?.text && <b>{props.text}</b>}
    </div>
  );
}

export default AppLoader;
