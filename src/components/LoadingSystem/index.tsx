import {
	Backdrop,
	CircularProgress,
	createStyles,
	makeStyles,
	Theme
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { IApplicationState } from "../../store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  })
);

export const LoadingSystem = () => {
  const classes = useStyles();
  const isLoading = useSelector(
    (state: IApplicationState) => state.systemLoading.isLoading
  );
  return (
    <Backdrop className={classes.backdrop} open={isLoading}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
};
