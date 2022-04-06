import {
  createStyles,
  InputBase,
  InputLabel,
  makeStyles,
  NativeSelect,
  Theme,
  withStyles,
} from "@material-ui/core";
import React from "react";

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
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
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
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  })
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiInputBase-root": {
        marginTop: 8,
        "& select": {
          padding: "6px 12px",
          minWidth: 180,
          fontSize: 16,
        },
      },
    },
  })
);

interface IProp {
  label: string;
  handleChange: (event: any) => void;
  value: string;
  options: { value: string; label: string }[];
  valueNone?: boolean;
}

export const SelectSearch = ({
  label,
  value,
  handleChange,
  options,
  valueNone = true,
}: IProp) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <InputLabel shrink htmlFor="bootstrap-input">
        {label}
      </InputLabel>
      <NativeSelect
        value={value}
        onChange={handleChange}
        input={<BootstrapInput />}
      >
        {valueNone && <option aria-label="None" value="" />}
        {options.map((item, idx) => (
          <option value={item.value} key={idx}>
            {item.label}
          </option>
        ))}
      </NativeSelect>
    </div>
  );
};
