import {
  alpha,
  createStyles,
  FormControl,
  InputBase,
  InputLabel,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core";
import React, { CSSProperties } from "react";

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.common.white,
      border: "1px solid #ced4da",
      fontSize: 16,
      width: "auto",
      padding: "10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  })
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      '& input': {
        padding: '6px 12px'
      }
    },
  })
);

interface IProp {
  label: string;
  defaultValue?: string;
  name: string
  style?: CSSProperties;
}

export const InputSearch = ({ label, defaultValue = '', name, style }: IProp) => {
  const classes = useStyles();
  return (
    <div>
      <FormControl className={classes.formControl} style={style}>
        <InputLabel shrink htmlFor="bootstrap-input">
          {label}
        </InputLabel>
        <BootstrapInput defaultValue={defaultValue} name={name} />
      </FormControl>
    </div>
  );
};
