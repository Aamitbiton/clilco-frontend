import React from "react";
import Text from "../../../../components/Text";
import { useTheme } from "@mui/material";
import "./Note.scss";
function Note({ note }) {
  const { title, content, icon } = note;
  const { palette } = useTheme();
  const style = {
    container: {
      zIndex: 500,
      border: `1px ${palette.primary.main} solid`,
      borderColor: palette.primary.main,
      borderRadius: 10,
      top: "3%",
      right: 20,
    },
  };
  // useEffect(() => {
  //   if (note.sound) {
  //     let audio = new Audio(note.sound);
  //     audio.play();
  //   }
  // }, []);
  return (
    <article className={"note-container"} style={style.container}>
      <section className={"note-icon-container"}>
        <img src={icon} className={"note-icon"} />
      </section>
      {title && (
        <Text
          color={"white"}
          sx={{ fontWeight: 500, letterSpacing: 1.4 }}
          align={"center"}
        >
          {title}
        </Text>
      )}
      {content.map((row, index) => (
        <Text
          key={index}
          align={"center"}
          fontSize={"22px"}
          fontWeight={"bold"}
          color={"primary"}
        >
          {row.message}
        </Text>
      ))}
    </article>
  );
}

export default Note;
