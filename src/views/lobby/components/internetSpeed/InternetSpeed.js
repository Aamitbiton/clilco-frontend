import React, { useEffect } from "react";

const InternetSpeed = ({ setInternetSpeed }) => {
  const created = () => {
    let startTime = Date.now();
    let download = new Image();
    let imgUrl =
      "https://upload.wikimedia.org/wikipedia/commons/9/90/Teruel_overview_size_8MB_%2825441803782%29.jpg";

    let cacheBuster = "?nnn=" + startTime;

    download.src = imgUrl + cacheBuster;

    download.onload = function () {
      showResults(Date.now(), startTime);
    };
  };
  const showResults = (endTime, startTime) => {
    const downloadSize = 8000000; //bytes
    var duration = (endTime - startTime) / 1000;
    var bitsLoaded = downloadSize * 8;
    var speedBps = (bitsLoaded / duration).toFixed(2);
    var speedKbps = (speedBps / 1024).toFixed(2);
    var finalSpeed = (speedKbps / 1024).toFixed(2);
    setInternetSpeed(finalSpeed);
  };
  useEffect(() => {
    created();
    const timer = setInterval(() => {
      created();
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <></>;
};
export default InternetSpeed;
