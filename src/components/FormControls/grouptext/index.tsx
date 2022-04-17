import { InputProps } from "@material-ui/core";
// import ChipInput from 'material-ui-chip-input';
// import Chip from "@material-ui/core/Chip";
import React, { ReactElement } from "react";
import { Control, Controller } from "react-hook-form";

interface IIcon {
  position: "left" | "right";
  Component: ReactElement;
}

interface Iprops
  extends Omit<InputProps, "onChange" | "value" | "variant" | "margin"> {
  control: Control<any>;
  rules: any;
  variant: "standard" | "outlined" | "filled";
  icon?: IIcon;
  name: string;
  onFocus?: any;
  helperText?: string | ReactElement;
  label: string | ReactElement;
  disabled?: boolean;
  margin?: "normal" | "dense" | "none";
  controllerExtras?: any;
}

export default function GroupText(props: Iprops) {
  const {
    control,
    icon,
    rules,
    helperText,
    variant,
    fullWidth,
    error,
    label,
    margin,
    disabled,
    controllerExtras = {},
    ...other
  } = props;

  // const chipRenderer = (
  //   { chip, className, handleClick, handleDelete }: any,
  //   key: any
  // ) => (
  //   <Chip
  //     className={className}
  //     key={key}
  //     disabled={Boolean(disabled)}
  //     label={chip}
  //     onClick={handleClick}
  //     onDelete={handleDelete}
  //     size="medium"
  //   />
  // );

  return (
    <Controller
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <div>Deprecated..</div>
        // <ChipInput
        //   variant={variant}
        //   defaultValue={value}
        //   label={label}
        //   margin={margin}
        //   fullWidth
        //   error={error}
        //   onChange={onChange}
        //   helperText={helperText}
        //   disabled={Boolean(disabled)}
        //   chipRenderer={chipRenderer}
        //   {...rest}
        //   InputProps={{
        //     endAdornment: (
        //       <div>
        //         {icon && icon.position === 'right' && (
        //           <InputAdornment position="start">
        //             {icon.Component}
        //           </InputAdornment>
        //         )}
        //       </div>
        //     ),
        //   }}
        // />
      )}
      name={other.name}
      control={control}
      rules={rules}
      {...controllerExtras}
    />
  );
}
