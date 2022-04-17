import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { ReactNode } from 'react';
import { Control, Controller } from 'react-hook-form';

interface IOption {
  id: string | number;
  label: string;
  labelShow?: JSX.Element;
}

interface IProps {
  name: string;
  title: string | JSX.Element;
  control: Control<any>;
  rules: any;
  options: IOption[];
  error: boolean;
  required?: boolean;
  disabled?: boolean;
  helperText: ReactNode;
}

export default function SelectSearch(props: IProps) {
  const {
    control,
    rules,
    error,
    required,
    disabled,
    helperText,
    name,
    title,
    options,
    ...other
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required }}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          onChange={(event, item) => {
            onChange(item);
          }}
          value={value}
          options={options}
          getOptionLabel={(item) => (item.label ? item.label : '')}
          getOptionSelected={(option, value) =>
            value === undefined || value === null || option.id === value.id
          }
          style={{
            marginTop: -16,
          }}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              label={title}
              margin="normal"
              variant="outlined"
              error={error}
              helperText={helperText}
              required={required}
            />
          )}
          renderOption={({ labelShow, label }) => labelShow ?? label}
          {...other}
        />
      )}
    />
  );
}
