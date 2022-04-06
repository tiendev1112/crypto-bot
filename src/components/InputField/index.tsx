import {
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  makeStyles,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useField } from "formik";
import React, { ReactNode, useState } from "react";
import "./style.scss";

interface IProps {
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  icon?: ReactNode;
  label?: string;
  disabled?: boolean;
  minRows?: number;
  maxRows?: number;
}
const useStyles = makeStyles(() => ({
  boFormInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& >label": {
      flex: 1,
      color: "#606266",
      fontSize: 14,
    },
    "& >div": {
      flex: 1,
      "& input": {
        padding: 8,
      },
    },
  },
}));

export const InputField = (props: IProps) => {
  const [field] = useField(props);
  const classes = useStyles();
  const { name, placeholder, type, required, icon, label, disabled, minRows, maxRows } =
    props;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  return (
    <FormControl className={label ? classes.boFormInput : ""}>
      {label && <FormLabel>{label}</FormLabel>}
      {type === "textarea" ? (
        <TextareaAutosize
          {...field}
          placeholder={placeholder}
          aria-label="minimum height"
          minRows={minRows}
          maxRows={maxRows}
          style={{ width: "50%", padding: 10 }}
        />
      ) : (
        <TextField
          {...field}
          name={name}
          placeholder={placeholder}
          type={showPassword ? 'text': type}
          required={required}
          id={field.name}
          autoComplete="off"
          InputProps={
            icon
              ? {
                  startAdornment: icon,
                  endAdornment:
                    type === "password" ? (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ) : (
                      <></>
                    ),
                }
              : {}
          }
          variant="outlined"
          disabled={disabled}
        />
      )}
    </FormControl>
  );
};

InputField.defaultProps = {
  placeholder: "",
  type: "text",
  required: false,
  label: "",
  disabled: false,
  minRows: 5,
  maxRows: 10,
};
