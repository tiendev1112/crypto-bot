import React, { ReactElement } from 'react';
import {
  MenuItem,
  TextField,
  StandardTextFieldProps,
  InputAdornment,
} from '@material-ui/core';
import { Control, Controller } from 'react-hook-form';
// import useStyles from './styles';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import _ from 'lodash';
import Chip from '@material-ui/core/Chip';

interface IIcon {
  position: 'left' | 'right';
  Component: ReactElement;
}

interface IOptions {
  id: string | number;
  label: string;
}

interface Iprops
  extends Omit<
    StandardTextFieldProps,
    'onChange' | 'value' | 'variant' | 'name'
  > {
  options: IOptions[];
  control: Control<any>;
  rules: any;
  variant: 'standard' | 'outlined' | 'filled';
  icon?: IIcon;
  name: string;
  inputVariant?: 'checkbox';
  controllerExtras?: any;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: null,
};

export default function MultipleSelect(props: Iprops) {
  // const classes = useStyles({});
  const {
    inputVariant,
    control,
    rules,
    options,
    icon,
    controllerExtras = {},
    ...other
  } = props;
  const optionsMap = React.useMemo(() => _.keyBy(options, 'id'), [options]);

  return (
    <Controller
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <TextField
          select
          {...other}
          SelectProps={{
            multiple: true,
            value: value || [],
            onChange: onChange,
            MenuProps: MenuProps,
            renderValue: (selected: any) => (
              <div
                style={{
                  display: 'inline-flex',
                  flexWrap: 'wrap',
                  gap: 6,
                }}
              >
                {selected.map((_value: any, index: any) => (
                  <Chip
                    key={index}
                    size="medium"
                    label={optionsMap?.[_value]?.label}
                  />
                ))}
              </div>
            ),
          }}
          InputProps={{
            endAdornment: (
              <React.Fragment>
                {icon && icon.position === 'right' && (
                  <InputAdornment position="start">
                    {icon.Component}
                  </InputAdornment>
                )}
              </React.Fragment>
            ),
          }}
        >
          {options.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {inputVariant === 'checkbox' ? (
                <React.Fragment>
                  <Checkbox
                    checked={Array.isArray(value) && value.includes(item.id)}
                  />
                  <ListItemText primary={item.label} />
                </React.Fragment>
              ) : (
                item.label
              )}
            </MenuItem>
          ))}
        </TextField>
      )}
      name={other.name}
      control={control}
      rules={rules}
      {...controllerExtras}
    />
  );
}
