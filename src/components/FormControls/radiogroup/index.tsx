import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@material-ui/core";
import React, { ReactElement } from "react";
import { Control, Controller } from "react-hook-form";
import useStyles from "./styles";

interface IIcon {
  position: "left" | "right";
  Component: ReactElement;
}

interface IValues {
  label: any;
  value: any;
}

interface Iprops extends Omit<RadioGroupProps, ""> {
  control: Control<any>;
  rules: any;
  icon?: IIcon;
  label: any;
  name: string;
  values: IValues[];
  helperText: string | undefined;
  error: boolean;
  disabled?: boolean;
  color?: "primary" | "secondary";
  controllerExtras?: any;
  margin?: "none" | "normal";
}

export default function AppRadioGroup(props: Iprops) {
  const {
    control,
    error,
    helperText,
    label,
    icon,
    rules,
    values,
    disabled,
    margin,
    color,
    controllerExtras = {},
    ...other
  } = props;
  const classes = useStyles({ margin });

  return (
    <Controller
      render={({ field, ...rest }) => (
        <FormControl
          component="fieldset"
          error={error}
          disabled={Boolean(disabled)}
          className={classes.formControl}
        >
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup {...other} value={field.value} onChange={field.onChange}>
            {values.map(({ label, value }, index) => (
              <FormControlLabel
                key={index}
                value={value}
                control={<Radio color={color || "primary"} />}
                label={label}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      )}
      name={other.name}
      control={control}
      rules={rules}
      {...controllerExtras}
    />
  );
}
