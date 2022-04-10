import React, { useEffect, useRef, useState } from "react";
import "./otherUserAborted.scss";

export const OtherUserAborted = ({ remoteStream, reset_connection }) => {
  const [counter, setCounter] = useState(0);

  const handle_not_connected_yet = () => {
    if (counter < 5) wait_one_second();
    else reset_connection();
  };
  const wait_one_second = () => {
    console.log(counter);
    setTimeout(() => {
      if (counter) setCounter(counter + 1);
    }, 1000);
  };

  useEffect(() => {
    if (!remoteStream.active) handle_not_connected_yet();
  }, [counter]);

  return (
    <>
      <div className="connecting-container">
        <h1 className="connecting-message">המשתמש השני יצא מהחדר... </h1>
      </div>
    </>
  );
};
