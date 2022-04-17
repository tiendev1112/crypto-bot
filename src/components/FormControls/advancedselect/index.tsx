import React from 'react';
import { components, Props } from 'react-select';
import { Control, Controller } from 'react-hook-form';
import Select from 'react-select';
import { FormControl, PropTypes, FormHelperText } from '@material-ui/core';
import useStyles from './styles';
import _ from 'lodash';
const { ValueContainer, Placeholder } = components;
// import { ValueContainer } from 'react-select/src/components/containers';

interface IOption {
  id: string | number;
  label: string;
}

interface IProps
  extends Omit<
    Props<IOption>,
    | 'onChange'
    | 'value'
    | 'name'
    | 'options'
    | 'getOptionLabel'
    | 'getOptionValue'
  > {
  name: string;
  control: Control<any>;
  rules: any;
  options: Array<IOption>;
  handleChange?: (
    value: Array<string | number> | string | number | null
  ) => void;
  controllerExtras?: any;
  margin?: PropTypes.Margin;
  error?: boolean;
  disabled?: boolean;
  customValueContainer?: boolean;
  helperText?: string;
}

export default function AdvancedSelect(props: IProps) {
  const {
    control,
    rules,
    handleChange,
    controllerExtras = {},
    margin,
    error,
    disabled,
    helperText,
    customValueContainer = true,
    ...other
  } = props;

  return (
    <Controller
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => {
        return (
          <FormControl
            margin={margin}
            error={Boolean(error)}
            disabled={Boolean(disabled)}
            fullWidth
          >
            <Select
              components={{
                ...(customValueContainer
                  ? {
                      ValueContainer: CustomValueContainer,
                    }
                  : undefined),
              }}
              placeholder={'Select..'}
              styles={{
                // Fixes the overlapping problem of the component
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
                menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
                control: (provided, state) => ({
                  ...provided,
                  ...(error
                    ? {
                        borderColor: 'red !important',
                        '&:hover': {
                          borderColor: 'red',
                        },
                        ...(state.isFocused
                          ? {
                              boxShadow: '0px 0px 2px red',
                            }
                          : undefined),
                      }
                    : undefined),
                }),
              }}
              getOptionLabel={(option: IOption) => option.label}
              getOptionValue={(option: IOption) => `${option.id}`}
              className="react-select"
              value={(other.options ?? []).filter(
                (item) =>
                  (Array.isArray(value) ? value : [value]).filter(
                    (element) => `${element}` === `${item.id}`
                  ).length > 0
              )}
              onChange={(value) => {
                const getValue = (value: Array<IOption> | IOption | null) => {
                  if (other.isMulti) {
                    if (Array.isArray(value))
                      return value.map((item) => item.id);
                    else return [];
                  } else {
                    if (value) return (value as IOption).id;
                    else return null;
                  }
                };
                const data = getValue(value as Array<IOption> | IOption | null);
                handleChange && handleChange(data);
                onChange(data);
              }}
              {...other}
            />
            {helperText && (
              <FormHelperText
                style={{ color: Boolean(error) ? 'red' : undefined }}
              >
                {helperText}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
      name={other.name}
      control={control}
      rules={rules}
      {...controllerExtras}
    />
  );
}

const CustomValueContainer = ({ children, ...props }: any) => {
  const classes = useStyles();
  const { hasValue, selectProps } = props;
  return (
    <ValueContainer {...props} className={classes.valueContainer}>
      <Placeholder
        {...props}
        className={
          hasValue || _.get(selectProps ?? {}, 'menuIsOpen', false)
            ? classes.floatingPlaceholder
            : undefined
        }
      >
        {props.selectProps.placeholder}
      </Placeholder>

      {React.Children.map(children, (child) =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};
