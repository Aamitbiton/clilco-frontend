import React, { useEffect, useState } from "react";
import Note from "./Note";
import NotesInstances, { reject_date } from "./NotesInstances";
import { MINUTE, SECOND } from "../../../../utils/dates";
function NotesContainer() {
  const [note, setNote] = useState(null);
  const instancesNames = NotesInstances;

  useEffect(() => {
    let interval;

    setTimeout(() => {
      clearInterval(interval);
      setNote(reject_date());
    }, MINUTE * 5);
    function create_note() {
      let random_tip
     if (check_if_already_seen_rules()) random_tip = instancesNames.date_tips();
     else random_tip = instancesNames.date_rules()
      setNote(random_tip);
    }
    create_note();
    interval = setInterval(() => {
      create_note();
    }, SECOND * 10);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const check_if_already_seen_rules = ()=>{
    let already_seen_rules = JSON.parse(localStorage.getItem("already_seen_rules"));
    let last_seen = new Date(already_seen_rules)
    let todayDate = new Date();
    let res = last_seen?.setHours(0, 0, 0, 0) === todayDate.setHours(0, 0, 0, 0);
    if (res) return true
    else {
      localStorage.setItem("already_seen_rules", JSON.stringify(new Date()));
      return false
    }
  }

  return <>{note && <Note note={note} />}</>;
}

export default NotesContainer;
