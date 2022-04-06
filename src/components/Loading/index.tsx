import React, { CSSProperties } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './style.scss';

interface IProps {
	inner?: boolean;
	style?: CSSProperties;
	wrapper?: boolean;
}

export const Loading = ({ inner, style, wrapper }: IProps) => {
	return (
		<div className={`${inner ? 'bo-loading-inner' : 'bo-loading'} ${wrapper && 'bo-loading-wrapper'}`} style={style}>
			<CircularProgress />
		</div>
	);
};

Loading.defaultProps = {
	inner: false,
	style: {},
	wrapper: false,
};
