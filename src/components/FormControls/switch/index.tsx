import {
  Switch as MuiSwitch, SwitchClassKey, SwitchProps
} from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import React from "react";
import { Control, Controller } from "react-hook-form";


interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}
interface Iprops extends Omit<SwitchProps, "onChange" | "checked"> {
  control: Control<any>;
  rules: any;
  name: string;
  label?: string | React.ReactElement;
  controllerExtras?: any;
}
const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "##0047E9",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "##0047E9",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  })
)(({ classes, ...props }: Props) => {
  return (
    <MuiSwitch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default function Switch(props: Iprops) {
  const { control, label, rules, controllerExtras = {}, ...other } = props;

  return (
    <section>
      <label>{label}</label>
      <Controller
        name={other.name}
        render={(props) => (
          <IOSSwitch
            {...props}
            {...other}
            onChange={(e) => props.field.onChange(e.target.checked)}
            checked={props.field.value}
          />
        )}
        control={control}
        {...controllerExtras}
      />
    </section>
  );
}
