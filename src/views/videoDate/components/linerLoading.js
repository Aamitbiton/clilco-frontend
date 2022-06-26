import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  barColorPrimary: {
    color: "#0ae5c0",
  },
  colorPrimary: {
    color: "#0ae5c0",
  },
});

export const LinearLoading = () => {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
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
      <br />
      {/*<b>{Math.min(progress).toFixed(0)}</b>*/}
    </div>
  );
};
