import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AppRoutes from "../../../../app/AppRoutes";

import { ReactInternetSpeedMeter } from "react-internet-meter";
// import "react-internet-meter/dist/index.css";
function InternetSpeed() {
  const [wifiSpeed, setwifiSpeed] = useState();
  // const [run, setRun] = useState(true);

  const navigate = useNavigate();

  const notify_internet_and_go_back_to_home_page = (speed) => {
    // debugger;
    // setRun(false);
    toast("אינטרנט חלש לא ניתן להתחבר לשיחה", { type: "error" });

    navigate(AppRoutes.ROOT);
  };
  // useEffect(() => {
  //   return () => setRun(false);
  // }, []);
  return (
    <>
      {/* {run && ( */}
      <ReactInternetSpeedMeter
        txtSubHeading={"Internet is too slow " + wifiSpeed + " MB/s"}
        outputType="modal"
        customClassName={null}
        txtMainHeading="Opps..."
        pingInterval={3000} // milliseconds
        thresholdUnit="megabyte" // "byte" , "kilobyte", "megabyte"
        threshold={8}
        imageUrl="https://www.sammobile.com/wp-content/uploads/2019/03/keyguard_default_wallpaper_silver.png"
        downloadSize="2550420" //bytes
        callbackFunctionOnNetworkDown={(speed) => {
          console.log(`Internet speed is down ${speed}`);
          if (speed < 5) notify_internet_and_go_back_to_home_page(speed);
        }}
        callbackFunctionOnNetworkTest={(speed) => {
          setwifiSpeed(speed);
        }}
      />
      {/*  )} */}
    </>
  );
}
export default InternetSpeed;
