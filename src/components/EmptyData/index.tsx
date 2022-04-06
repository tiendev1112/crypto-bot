import React, { CSSProperties } from 'react';
import './style.scss';

interface IProps {
	text?: string,
	style?: CSSProperties,
}


export const EmptyData = ({ text = 'Empty data', style }: IProps) => {
	return (
		<div className='bo-empty-data' style={style}>
			<h2>{text}</h2>
		</div>
	);
};
