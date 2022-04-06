import { FormLabel, Switch } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import "./style.scss";

interface IProp {
  checked: boolean;
  handleAction?: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label?: string;
  disabled?: boolean;
}

export const SwitchButton = ({
  checked,
  handleAction = () => {},
  name,
  label = "",
  disabled = false,
}: IProp) => {
  return (
    <div className={`switch-box ${label ? "label" : ""}`}>
      {label && <FormLabel>{label}</FormLabel>}
      <Switch
        checked={checked}
        onChange={(event) => handleAction(event)}
        color="primary"
        name={name}
        inputProps={{ "aria-label": "primary checkbox" }}
        disabled={disabled}
      />
    </div>
  );
};
