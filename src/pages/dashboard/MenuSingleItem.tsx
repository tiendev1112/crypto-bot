import React from 'react';
import { NavLink } from 'react-router-dom';

interface Iprops {
	link: string;
	text: string;
	onClick?: () => void;
	canAccess?: boolean;
}

export const MenuSingleItem = (props: Iprops) => {
	if (props.canAccess === false) {
		return null;
	}
	return (
		<li>
			{props.onClick ? (
				<span className='nav-link' onClick={props.onClick}>
					<span className='text'>{props.text}</span>
				</span>
			) : (
				<NavLink className='nav-link' to={props.link}>
					<span className='text'>{props.text}</span>
				</NavLink>
			)}
		</li>
	);
};
