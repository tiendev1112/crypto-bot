import React, { ReactNode } from "react";
import { ButtonAction } from "..";
import { FormModal } from "./";
import ErrorIcon from "@material-ui/icons/Error";

interface IProps {
  onDismiss: () => void;
  onValidate: () => void;
  title?: string | ReactNode;
  validateBtnText?: string;
  cancelBtnText?: string;
  open: boolean;
  isColorSubmit?: boolean;
}

export const ConfirmModal = ({
  onDismiss,
  open,
  onValidate,
  title = "Are you sure?",
  cancelBtnText = "Cancel",
  validateBtnText = "Ok",
  isColorSubmit = false,
}: IProps) => {
  return (
    <FormModal open={open} handleClose={onDismiss} style={{ width: 450 }}>
      <h3>Warning</h3>
      <div style={{ padding: "20px 0", fontSize: 18 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <ErrorIcon style={{ marginRight: 10 }} color="secondary" />
          <span>{title}</span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ButtonAction
          onClick={onDismiss}
          title={cancelBtnText}
          style={{ backgroundColor: "#fff", color: "inherit", marginRight: 10 }}
        />
        <ButtonAction onClick={onValidate} title={validateBtnText} />
      </div>
    </FormModal>
  );
};
