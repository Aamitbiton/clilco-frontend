import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  root: {
    width: "80%",
    position: "absolute",
    zIndex: "1000",
    top: "50%",
    left: "10%",
  },
  barColorPrimary: {
    color: "#0ae5c0",
  },
  colorPrimary: {
    color: "#0ae5c0",
  },
  text: {
    display: "flex",
    justifyContent: "center",
  },
});

export const LinearLoading = ({ endAction }) => {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          endAction();
          clearInterval(timer);
          return 0;
        }
        const diff = oldProgress + 0.1666;

        return Math.min(diff);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <LinearProgress
        color={"primary"}
        variant="determinate"
        value={progress}
      />
      <b className={classes.text}>זמן לסיום והחלטה</b>
    </div>
  );
};
