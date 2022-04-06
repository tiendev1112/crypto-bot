import React from 'react';

interface Iprops {
	text: string;
	children: JSX.Element;
	canAccess?: boolean;
}

export const MenuParentItem = (props: Iprops) => {
	if (props.canAccess === false) {
		return null;
	}
	return (
		<li className="has-children">
			<span className='nav-link title'>
				<span className='parent'>{props.text}</span>
			</span>
			{props.children}
		</li>
	);
};
