import React from 'react';
import './index.scss';

const Button = ({ onClick = (id: string) => {}, id = '' }) => {
	const handleClick = () => onClick(id);
	return (
		<button className="fret_revealer fret_revealer_last" onClick={handleClick}>
			Toggle Positions
		</button>
	);
};

export default Button;
