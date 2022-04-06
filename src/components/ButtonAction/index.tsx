import { Button, PropTypes } from "@material-ui/core";
import React, { CSSProperties, ReactNode } from "react";
import "./style.scss";

interface IProps {
  title: string | ReactNode;
  onClick?: () => void;
  color?: PropTypes.Color;
  variant?: "text" | "outlined" | "contained";
  type?: "button" | "submit" | "reset" | undefined;
  style?: CSSProperties;
  disabled?: boolean;
}

export const ButtonAction = ({
  title,
  onClick = () => {},
  color,
  variant,
  type,
  style,
  disabled
}: IProps) => {
  return (
    <div className="bo-btn__box">
      <Button
        color={color}
        variant={variant}
        onClick={() => onClick()}
        type={type}
        style={style}
        disabled={disabled}
      >
        {title}
      </Button>
    </div>
  );
};

ButtonAction.defaultProps = {
  color: "primary",
  variant: "contained",
  type: "button",
  disabled: false
};
