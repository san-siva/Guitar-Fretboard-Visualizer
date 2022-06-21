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

	return (
		<div
			onClick={handleClickMarker}
			className={`marker ${isBasic ? 'marker_basic' : 'marker_root_note'} ${
				isActive ? 'marker_color_active' : ''
			}`}
		></div>
	);
};

export default Marker;
