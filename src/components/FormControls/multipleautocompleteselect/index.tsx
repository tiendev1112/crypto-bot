import { StandardTextFieldProps, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import _ from "lodash";
import React from "react";
import { Control, Controller } from "react-hook-form";

type AutocompleteProps = React.ComponentProps<typeof Autocomplete>;

interface Iprops extends StandardTextFieldProps {
  options: Array<any>;
  control: Control<any>;
  rules: any;
  selectedKey: string;
  name: string;
  handleChange?: (data: string) => void;
  controllerExtras?: any;
  style?: React.CSSProperties;
  autoCompleteProps?: AutocompleteProps;
}

export default function MultipleAutoCompleteSelect(props: Iprops) {
  const {
    control,
    rules,
    options,
    handleChange,
    selectedKey,
    style,
    id,
    name,
    controllerExtras = {},
    autoCompleteProps,
    ...other
  } = props;

  return (
    <div>
      <Controller
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
          <Autocomplete
            {...(autoCompleteProps as any)}
            multiple
            options={options}
            id={id}
            value={value ?? []}
            filterSelectedOptions
            disableCloseOnSelect
            getOptionLabel={(option) => _.get(option, selectedKey)}
            renderOption={(option, { selected }) => _.get(option, selectedKey)}
            onChange={(event: React.ChangeEvent<{}>, newValue: any) => {
              const lastValue = newValue?.pop();
              if (typeof lastValue === "string") {
                newValue.push({
                  id: 0,
                  name: lastValue,
                });
              } else {
                newValue.push(lastValue);
              }
              onChange(newValue.filter((item: any) => item !== undefined));
            }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" {...other} />
            )}
          />
        )}
        name={name}
        control={control}
        rules={rules}
        {...controllerExtras}
      />
    </div>
  );
}
