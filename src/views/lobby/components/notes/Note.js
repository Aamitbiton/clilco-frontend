import React from "react";
import Text from "../../../../components/Text";
import { useTheme } from "@mui/material";
import "./Note.scss";
function Note({ note }) {
  const { title, content, icon } = note;
  const { palette } = useTheme();
  const style = {
    container: {
      zIndex: 100,
      border: `1px ${palette.primary.main} solid`,
      borderColor: palette.primary.main,
      borderRadius: 10,
      top: "10%",
      right: 20,
    },
  };
  return (
    <article className={"note-container"} style={style.container}>
      <section className={"note-icon-container"}>
        <img src={icon} className={"note-icon"} />
      </section>
      {title && (
        <Text
          color={"primary"}
          sx={{ fontWeight: 600, letterSpacing: 1.4 }}
          align={"center"}
        >
          {title}
        </Text>
      )}
      {content.map((row, index) => (
        <Text key={index} align={"center"} fontSize={'18px'} fontWeight={'bold'} color={row.highlighted && "primary"}>
          {row.message}
        </Text>
      ))}
    </article>
  );
}

export default Note;
