import { Box, Checkbox, FormLabel } from "@material-ui/core";
import React from "react";
import "./style.scss";

interface IProp {
  label: string;
  name: string;
  defaultChecked: boolean;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

export const InputCheckbox = ({
  label,
  name,
  defaultChecked,
  setFieldValue,
}: IProp) => {
  return (
    <div className="check-box-active">
      <FormLabel>{label}</FormLabel>
      <Box>
        {/* <FormControlLabel
          control={ */}
        <Checkbox
          defaultChecked={defaultChecked}
          color="primary"
          onChange={(event) => setFieldValue(name, event.target.checked)}
          style={{ marginLeft: -12 }}
        />
        {/* }
          label={label}
          labelPlacement="end"
        /> */}
      </Box>
    </div>
  );
};
