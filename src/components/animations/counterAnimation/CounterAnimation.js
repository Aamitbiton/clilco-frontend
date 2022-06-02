import React, { useEffect, useState } from "react";
import "./counterAnimation.css";

function CounterAnimation({ onEnd }) {
  let counter = 3;
  let element = null;
  useEffect(() => {
    element = document.getElementById("counter");
    element.addEventListener("animationiteration", changeCounter);
    element.innerHTML = counter;
  }, []);
  const endEvent = () => {
    element.classList.toggle("stop");
    element.removeEventListener("animationiteration", changeCounter);
    onEnd();
  };
  const changeCounter = () => {
    if (counter === 1) endEvent();
    else {
      if ("vibrate" in navigator) {
        // vibration API supported
        navigator.vibrate(1000);
      }
      counter--;
      element.innerHTML = counter;
    }
  };
  return (
    <div className={"flex-center full-screen"}>
      <h1 id="counter" className="text" />
    </div>
  );
}

export default CounterAnimation;
