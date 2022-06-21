import React from 'react';
import './index.scss';

const Marker = ({
	onClick = (isBasic: boolean) => {},
	isActive = false,
	isBasic = true
}) => {
	const handleClickMarker = () => {
		if (onClick) onClick(isBasic);
	};

	console.log(isBasic, 'isBasic');
	return (
		<div
			onClick={handleClickMarker}
			className={`dot ${isBasic ? 'dot_basic' : 'dot_root_note'} ${
				isActive ? 'dot_color_active' : ''
			}`}
		></div>
	);
};

export default Marker;
