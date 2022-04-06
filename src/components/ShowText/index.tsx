import {
  FormLabel
} from "@material-ui/core";
import React from "react";

interface IProps {
  label: string;
  content: string;
}

export const ShowText = ({label, content}: IProps) => {
  return (
    <div style={{display: 'flex', alignItems: 'center'}} className="show-text">
      <FormLabel style={{fontSize: 14, flex: 1}}>{label}</FormLabel>
      <span style={{fontSize: 14, flex: 1}}>{content}</span>
    </div>
  );
};
