import React, { useEffect, useState } from "react";
import Note from "./Note";
import NotesInstances, { reject_date } from "./NotesInstances";
import { MINUTE, SECOND } from "../../../../utils/dates";
function NotesContainer() {
  const [note, setNote] = useState(null);
  const instancesNames = Object.keys(NotesInstances);
  // const handle_set_random = () => {
  //   const currentRandom = Math.floor(Math.random() * instancesNames.length);
  //   if (currentRandom === random && random === 0) {
  //     console.log("1");
  //     setRandom(currentRandom + 1);
  //   } else if (currentRandom === random && random === instancesNames.length) {
  //     console.log("2");
  //     setRandom(currentRandom - 1);
  //   } else {
  //     console.log("3");
  //     setRandom(currentRandom);
  //   }
  // };
  useEffect(() => {
    let interval;

    setTimeout(() => {
      clearInterval(interval);
      setNote(reject_date());
    }, MINUTE * 5);
    function create_note() {
      const random = Math.floor(Math.random() * instancesNames.length);
      const random_note = instancesNames[random];
      setNote(NotesInstances[random_note](random));
    }
    create_note();
    interval = setInterval(() => {
      create_note();
    }, SECOND * 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <>{note && <Note note={note} />}</>;
}

export default NotesContainer;
