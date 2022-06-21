import React from 'react';
import Marker from '../Marker';
import './index.scss';

const FretToolbar = ({
	onClickMarker = (isBasic: boolean) => {},
	activeMarker = 1
}) => {
	return (
		<div className="fret-tool-bar">
			<div className="markers">
				<Marker onClick={onClickMarker} isActive={activeMarker === 1} isBasic />
				<Marker
					onClick={onClickMarker}
					isActive={activeMarker === 2}
					isBasic={false}
				/>
			</div>
		</div>
	);
};

export default FretToolbar;
