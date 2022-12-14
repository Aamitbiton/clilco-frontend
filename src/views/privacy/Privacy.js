import React from "react";
import { PRIVACY_POLICY } from "./privacy_content";
import Title from "../../components/title/title";
function Privacy({ show, onClick }) {
  return (
    <div
      onClick={onClick}
      className={show ? "privacy-box-show" : "privacy-box-hide"}
    >
      <button
        style={{
          height: 30,
          padding: 10,
          margin: 10,
        }}
      >
        X
      </button>
      <Title title={"תנאי שימוש ופרטיות"} />
      <span>{PRIVACY_POLICY}</span>
    </div>
  );
}

export default Privacy;
