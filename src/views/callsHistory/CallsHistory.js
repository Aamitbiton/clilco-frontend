import React, { useEffect, useState } from "react";
import "./callsHistory.scss";
import { get_calls } from "../../store/video/videoFunctions";

export const CallsHistory = () => {
  const [calls, setCalls] = useState([]);
  const created = async () => {
    const db_calls = await get_calls();
    setCalls(db_calls);
  };
  useEffect(created, []);
  return (
    <>
      <h1>CallsHistory</h1>
      <p>{JSON.stringify(calls)}</p>
    </>
  );
};
