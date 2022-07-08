import React from 'react';
import Marker from '../Marker';
import Button from '../Button';
import './index.scss';

const FretToolbar = ({
	onClickMarker = (isBasic: boolean) => {},
	onToggleNotes = () => {},
	onToggleFrets = () => {},
	onToggleScales = (scale: string) => {},
	activeMarker = 1,
	activeScale = ''
}) => {
	return (
		<div className="fret-tool-bar">
			<div className="markers">
				<Marker onClick={onClickMarker} isActive={activeMarker === 1} isBasic />
				<Marker
					onClick={onClickMarker}
					isActive={activeMarker === 2}
					isBasic={false}
				/> </div>
			<Button name="Toggle Note's" onClick={onToggleNotes} />
			<Button name="Toggle Fret Number's" onClick={onToggleFrets} />
			<h3>Toggle Scales</h3>
			<div className="fret-scales">
				<Button
					isActive={activeScale === 'C'}
					name="C"
					id="C"
					onClick={onToggleScales}
				/>
				<Button
					isActive={activeScale === 'A'}
					name="A"
					id="A"
					onClick={onToggleScales}
				/>
				<Button
					isActive={activeScale === 'G'}
					name="G"
					id="G"
					onClick={onToggleScales}
				/>
				<Button
					isActive={activeScale === 'E'}
					name="E"
					id="E"
					onClick={onToggleScales}
				/>
				<Button
					isActive={activeScale === 'D'}
					name="D"
					id="D"
					onClick={onToggleScales}
				/>
			</div>
		</div>
	);
};

export default FretToolbar;
