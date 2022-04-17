import {
  InputAdornment,
  // TextField as MuTextField,
  StandardTextFieldProps,
  TextField,
} from "@material-ui/core";
import React, { ReactElement } from "react";
import { Control, Controller } from "react-hook-form";

interface IIcon {
  // position: 'left' | 'right';
  ComponentLeft?: ReactElement;
  ComponentRight?: ReactElement;
}

interface Iprops
  extends Omit<StandardTextFieldProps, "onChange" | "value" | "variant"> {
  control: Control<any>;
  rules: any;
  variant: "standard" | "outlined" | "filled";
  icon?: IIcon;
  name: string;
  onFocus?: any;
  controllerExtras?: any;
}

export default function TTextField(props: Iprops) {
  const { control, icon, rules, controllerExtras = {}, ...other } = props;

  return (
    <Controller
      render={({
        field: { onChange, value, ...rest },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <TextField
          value={value || ""}
          onChange={onChange}
          {...rest}
          {...other}
          InputProps={{
            endAdornment: icon && icon.ComponentRight && (
              <React.Fragment>
                {
                  <InputAdornment position="start">
                    {icon.ComponentRight}
                  </InputAdornment>
                }
              </React.Fragment>
            ),
            startAdornment: icon && icon.ComponentLeft && (
              <React.Fragment>
                {
                  <InputAdornment position="end">
                    {icon.ComponentLeft}
                  </InputAdornment>
                }
              </React.Fragment>
            ),
            ...other.InputProps,
          }}
        />
      )}
      name={other.name}
      control={control}
      rules={rules}
      {...controllerExtras}
    />
  );
}
