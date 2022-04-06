import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DateType } from "@date-io/type";
import { FormLabel, makeStyles } from "@material-ui/core";

interface IProp {
  selectedDate: object | string | number | Date | null | undefined;
  handleDateChange: (
    date: DateType | null,
    value?: string | null | undefined
  ) => void;
  label?: string;
  format?: string;
  isDateTime?: boolean;
  disablePast?: boolean;
}
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    "& >label": {
      width: "50%",
      fontSize: 14,
    },
    "& input": {
      padding: "10px 15px",
      fontSize: 14,
    },
  },
}));

export const SelectDate = ({
  selectedDate,
  handleDateChange,
  label = "",
  format = "dd/MM/yyyy",
  isDateTime = false,
  disablePast = false
}: IProp) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {label && <FormLabel>{label}</FormLabel>}
        {isDateTime ? (
          <KeyboardDateTimePicker
            variant="inline"
            ampm={false}
            value={selectedDate}
            onChange={handleDateChange}
            onError={console.log}
            disablePast={disablePast}
            format={format}
          />
        ) : (
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format={format}
            id="date-picker-inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            inputVariant="outlined"
            placeholder="Pick a day"
            autoOk
            disablePast={disablePast}
          />
        )}
      </MuiPickersUtilsProvider>
    </div>
  );
};
