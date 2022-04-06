import { Box, FormControl, FormLabel } from "@material-ui/core";
import { useField } from "formik";
import React, { useRef, useState } from "react";
import Select from "react-select";
import "./style.scss";

type OptionType = { label: string; value: string };
interface IProp {
  label: string;
  isMulti?: boolean;
  placeholder?: string;
  options: OptionType[];
  name: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  handleBlur: {
    (e: React.FocusEvent<any>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  isSelectAll?: boolean;
  disabled?: boolean;
}

export const ReactSelect = (props: IProp) => {
  const {
    label,
    isMulti,
    placeholder,
    options,
    name,
    setFieldValue,
    handleBlur,
    isSelectAll,
    disabled,
  } = props;
  const [field] = useField(name);
  const selectAllOption = { label: "Select All", value: "selectAll" };
  const [value, setValue] = useState<OptionType[]>(field.value);
  const valueRef = useRef(value);
  valueRef.current = value;
  const isSelectAllSelected = () => valueRef.current.length === options.length;
  const isOptionSelected = (option: any) =>
    valueRef.current.some(({ value }) => value === option.value) ||
    isSelectAllSelected();
  const onChangeSelectAll = (newValue: OptionType[] | any, actionMeta: any) => {
    const { action, option, removedValue } = actionMeta;
    if (action === "select-option" && option.value === selectAllOption.value) {
      setValue(options);
      setFieldValue(name, options);
    } else if (
      (action === "deselect-option" &&
        option.value === selectAllOption.value) ||
      (action === "remove-value" &&
        removedValue.value === selectAllOption.value)
    ) {
      setValue([]);
      setFieldValue(name, []);
    } else if (
      actionMeta.action === "deselect-option" &&
      isSelectAllSelected()
    ) {
      const valueTemp = options.filter(({ value }) => value !== option.value);
      setValue(valueTemp);
      setFieldValue(name, valueTemp);
    } else {
      setValue(newValue || []);
      setFieldValue(name, newValue || []);
    }
  };
  return (
    <Box className="react-select__box">
      <FormControl>
        <FormLabel>{label}</FormLabel>
        {isSelectAll ? (
          <Select
            options={[selectAllOption, ...options]}
            value={value}
            placeholder={placeholder}
            isMulti
            closeMenuOnSelect={false}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            onChange={(option, actionMeta) =>
              onChangeSelectAll(option, actionMeta)
            }
            onBlur={handleBlur}
            name={name}
            isOptionSelected={isOptionSelected}
            isDisabled={disabled}
          />
        ) : (
          <Select
            options={options}
            placeholder={placeholder}
            isMulti={isMulti}
            closeMenuOnSelect={isMulti ? false : true}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            onChange={(option) => setFieldValue(name, option)}
            onBlur={handleBlur}
            name={name}
            defaultValue={field.value}
            isDisabled={disabled}
          />
        )}
      </FormControl>
    </Box>
  );
};

ReactSelect.defaultProps = {
  isMulti: false,
  placeholder: "Select",
  isSelectAll: false,
  disabled: false,
};
