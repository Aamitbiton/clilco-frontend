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
      <div className="calls">
        {calls.map((call, i) => (
          <div className="call" key={i}>
            {JSON.stringify(call)}
          </div>
        ))}
      </div>
    </>
  );
};
