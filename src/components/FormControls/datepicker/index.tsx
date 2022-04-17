import React, { ReactElement } from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  KeyboardDateTimePickerProps,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Control, Controller } from 'react-hook-form';

interface IDatePickerProps
  extends Omit<KeyboardDateTimePickerProps, 'onChange' | 'value'> {
  control: Control<any>;
  rules: any;
  name: string;
  handleChange?: (data: Date | null) => void;
  controllerExtras?: any;
}

export default function DatePicker(props: IDatePickerProps): ReactElement {
  const {
    control,
    rules,
    handleChange,
    controllerExtras = {},
    ...other
  } = props;

  return (
    <Controller
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            disableToolbar
            onChange={(date, value) => {
              handleChange && handleChange(date);
              onChange(date, value);
            }}
            {...other}
            format={other.format || 'dd-MM-yyyy HH:mm'}
            variant={other.variant || 'inline'}
            inputVariant={other.inputVariant || 'outlined'}
            value={value}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      )}
      name={other.name}
      rules={rules}
      control={control}
      {...controllerExtras}
    />
  );
}
