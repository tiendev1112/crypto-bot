import {
  Checkbox as MiCheckbox,
  CheckboxProps,
  FormControlLabel,
} from "@material-ui/core";
import React from "react";
import { Control, Controller } from "react-hook-form";

export interface ICheckBoxProps
  extends Omit<CheckboxProps, "onChange" | "checked"> {
  control: Control<any>;
  rules: any;
  name: string;
  label?: string | React.ReactElement;
  controllerExtras?: any;
}

export default function CheckBox(props: ICheckBoxProps) {
  const { control, label, rules, controllerExtras = {}, ...other } = props;

  return (
    <Controller
      name={other.name}
      render={(props) => (
        <FormControlLabel
          name={other.name}
          control={
            <MiCheckbox
              {...props}
              {...other}
              onChange={(e) => props.field.onChange(e.target.checked)}
              checked={props.field.value}
            />
          }
          label={label}
        />
      )}
      control={control}
      {...controllerExtras}
    />
  );
}
