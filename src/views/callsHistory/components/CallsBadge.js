import React, { useEffect, useState } from "react";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";

function CallsBadge({ style }) {
  const [badge_visible, set_badge_visible] = useState(false);
  const video_state = useSelector((s) => s.video);
  const successCalls = video_state.success_calls;

  const handle_badge_visible = () => {
    let last_visited_calls = localStorage.getItem("last_visited_calls");
    if (!last_visited_calls) return set_badge_visible(true);
    last_visited_calls = parseInt(last_visited_calls);
    const is_there_unseen_call = successCalls.some((call) => {
      return call.endTime > last_visited_calls;
    });
    set_badge_visible(is_there_unseen_call);
  };
  useEffect(handle_badge_visible, [successCalls]);
  return (
    badge_visible && (
      <Badge style={style} color={"success"} variant="dot" invisible={false} />
    )
  );
}

export default CallsBadge;
