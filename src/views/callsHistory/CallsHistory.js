import React, { useEffect, useState } from "react";
import "./callsHistory.scss";
import { get_calls } from "../../store/video/videoFunctions";
import { SingleCall } from "./components/singleCall/SingleCall";
import { Header } from "../home/components/header/header";

export const CallsHistory = () => {
  const [calls, setCalls] = useState([]);
  const created = async () => {
    const db_calls = await get_calls();
    setCalls(db_calls);
  };
  useEffect(created, []);
  return (
    <>
      <Header />
      <div className="calls">
        {calls
          .sort((a, b) => b.startTime - a.startTime)
          .map((call, i) => (
            <SingleCall key={i} call={call} />
          ))}
      </div>
    </>
  );
};
