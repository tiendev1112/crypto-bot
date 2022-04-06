import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

interface Iprops {
	data: { id: string | number; text: string }[];
	label?: string;
	onBlur?: () => void;
	onChange?: (event: any) => void;
	value?: string | number;
	isWhite?: boolean;
	error?: boolean;
}

export const SelectOption = (props: Iprops) => {
	const { label = '', error = false, onChange = () => {}, value = 0, data } = props;
	return (
		<div className='field-container'>
			<FormControl variant='outlined'>
				<InputLabel>{label}</InputLabel>
				<Select style={{ minWidth: 150 }} error={error} value={value} onChange={onChange} label={label}>
					{data?.map(({ id, text }, index) => {
						return (
							<MenuItem key={index} value={id}>
								{text}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</div>
	);
};
