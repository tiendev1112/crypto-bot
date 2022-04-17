import {
  InputAdornment,
  MenuItem,
  StandardTextFieldProps,
  TextField,
} from "@material-ui/core";
import React, { ReactElement } from "react";
import { Control, Controller } from "react-hook-form";
// import useStyles from "./styles";

interface IIcon {
  // position: 'left' | 'right';
  // Component: ReactElement;
  ComponentLeft?: ReactElement;
  ComponentRight?: ReactElement;
}

interface IOptions {
  id: string | number;
  label: string | ReactElement;
}

interface Iprops
  extends Omit<
    StandardTextFieldProps,
    "onChange" | "value" | "variant" | "name"
  > {
  includeNone?: boolean;
  options: IOptions[];
  control: Control<any>;
  rules: any;
  variant: "standard" | "outlined" | "filled";
  icon?: IIcon;
  name: string;
  handleChange?: (data: string) => void;
  controllerExtras?: any;
  uniqueId?: boolean;
}

export default function Select(props: Iprops) {
  const {
    control,
    rules,
    includeNone,
    options,
    icon,
    handleChange,
    controllerExtras = {},
    uniqueId = true,
    ...other
  } = props;
  // const classes = useStyles();

  // https://smartdevpreneur.com/override-textfield-border-color-in-material-ui/
  return (
    <Controller
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <TextField
          select
          value={value || ""}
          onChange={(event) => {
            handleChange && handleChange(event.target.value);
            onChange(event);
          }}
          {...other}
          InputProps={{
            endAdornment: icon && (
              <React.Fragment>
                {icon.ComponentRight && (
                  <InputAdornment position="start">
                    {icon.ComponentRight}
                  </InputAdornment>
                )}
              </React.Fragment>
            ),
            startAdornment: icon && (
              <React.Fragment>
                {icon.ComponentLeft && (
                  <InputAdornment position="end">
                    {icon.ComponentLeft}
                  </InputAdornment>
                )}
              </React.Fragment>
            ),
            ...other.InputProps,
          }}
          // InputProps={{
          //   endAdornment: (
          //     <React.Fragment>
          //       {icon && icon.position === 'right' && (
          //         <InputAdornment position="start">
          //           {icon.Component}
          //         </InputAdornment>
          //       )}
          //     </React.Fragment>
          //   ),
          // }}
        >
          {includeNone && <MenuItem value="">None</MenuItem>}
          {options.map(({ id, label }, index) => (
            <MenuItem key={uniqueId ? id : index} value={id}>
              {label}
            </MenuItem>
          ))}
        </TextField>
      )}
      name={other.name}
      control={control}
      rules={rules}
      {...controllerExtras}
    />
  );
}
