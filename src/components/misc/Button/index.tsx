import React from 'react';
import './index.scss';

const Button = ({
	isActive = false,
	name = '',
	onClick = (id: string) => {},
	id = ''
}) => {
	const handleClick = () => onClick(id);
	return (
		<button
			className={`fret_revealer ${isActive ? 'fret_revealer_active' : ''}`}
			onClick={handleClick}
		>
			{name}
		</button>
	);
};

export default Button;
