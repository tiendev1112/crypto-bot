import React, { ReactNode } from "react";
import DehazeIcon from "@material-ui/icons/Dehaze";
import "./style.scss";

interface IProps {
  children: ReactNode;
}

export const IconDetail = ({ children }: IProps) => {
  return (
    <div className="icon-detail__box">
      <span className="icon">
        <DehazeIcon />
      </span>
      <div className="content_box">{children}</div>
    </div>
  );
};
