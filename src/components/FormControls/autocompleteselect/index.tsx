import { StandardTextFieldProps } from "@material-ui/core";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface Iprops extends StandardTextFieldProps {
  options: Array<any>;
  control: Control<any>;
  rules: any;
  selectedKey: string;
  name: string;
  handleChange?: (data: string) => void;
  controllerExtras?: any;
  style?: React.CSSProperties;
}

export default function AutoCompleteSelect(props: Iprops) {
  const {
    control,
    rules,
    options,
    handleChange,
    selectedKey,
    style,
    id,
    controllerExtras = {},
    ...other
  } = props;
  return (
    <Controller
      render={(props) => (
        // <Select
        //   {...props}
        //   classes={classes}
        //   styles={selectStyles}
        //   options={suggestions}
        //   components={components}
        //   // value={single}
        //   // onChange={handleChangeSingle}
        //   onChange={props.onChange}

        //   // placeholder="Search a country (start with a)"
        // />
        <span>Deprecated</span>
        // <Select
        //   {...props}
        //   classes={classes}
        //   styles={selectStyles}
        //   options={options}
        //   components={components}
        //   // value={this.state.single}
        //   // onChange={this.handleChange('single')}
        //   isClearable
        // />

        // <Autocomplete
        //   {...props}
        //   options={options}
        //   getOptionLabel={(option) => `${option[selectedKey]}`}
        //   renderInput={(params) => (
        //     <TextField
        //       variant="outlined"
        //       {...params}
        //       {...other}
        //       value={'other.value'}
        //     />
        //   )}
        //   onChange={(__, data) => {
        //     // const result = _.get(data, selectedKey);
        //     handleChange && handleChange(data || '');
        //     props.onChange(data);
        //   }}
        // />

        // <Autocomplete
        //   {...props}
        //   options={options}
        //   getOptionLabel={(option) => `${option}` || ''}
        //   renderOption={(option) => `${option[selectedKey]}` || ''}
        //   disabled={other.disabled}
        //   renderInput={(params) => (
        //     <TextField variant="outlined" {...params} {...other} />
        //   )}
        //   onChange={(__, data) => {
        //     const result = _.get(data, selectedKey);
        //     handleChange && handleChange(result || '');
        //     props.onChange(result);
        //   }}
        // />
      )}
      name={other.name}
      control={control}
      rules={rules}
      {...controllerExtras}
    />
  );
}
