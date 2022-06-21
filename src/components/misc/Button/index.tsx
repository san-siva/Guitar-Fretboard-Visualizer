import React from 'react';
import './index.scss';

const Button = ({ name = '', onClick = (id: string) => {}, id = '' }) => {
	const handleClick = () => onClick(id);
	return (
		<button className="fret_revealer" onClick={handleClick}>
			{name}
		</button>
	);
};

export default Button;
