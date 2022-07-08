import React, { useState, useRef } from 'react';
import _ from 'lodash';

import FretToolbar from '../FretToolBar';
import { useScreenshot, createFileName } from 'use-react-screenshot';

import {
	defaultFretMap,
	scales,
	closedNotes,
	openNotes
} from '../../../utils/defaults';
import './index.scss';

const FretBoard = () => {
	const containerRef = useRef(null);
	const [image, takeScreenshot] = useScreenshot();
	const [activeScale, updateActiveScale] = useState('');

	const [fretMap, updateFretMap] =
		useState<{ [T: string]: number }>(defaultFretMap);

	const [selectedMarker, updateSelectedMarker] = useState(2);
	const [isFretNotesEnabled, toggleFretNotes] = useState(true);
	const [isFretNumbersEnabled, toggleFretNumbers] = useState(true);

	const handleClickNote = (e: any) => {
		const id = e.currentTarget.getAttribute('data-id') as string;
		updateFretMap(prevState => {
			const newFretMap = {
				...prevState,
				[id]: prevState[id] === selectedMarker ? 0 : selectedMarker
			};
			updateActiveScale('');
			_.forEach(scales, (value, key) => {
				if (JSON.stringify(value) === JSON.stringify(newFretMap)) {
					updateActiveScale(key);
				}
			});
			return newFretMap;
		});
	};

	const onClickMarker = (isBasic: boolean) => {
		updateSelectedMarker(isBasic ? 1 : 2);
	};

	const handleToggleFrets = () => {
		toggleFretNumbers(prevVal => !prevVal);
	};

	const handleToggleNotes = () => {
		toggleFretNotes(prevVal => !prevVal);
	};

	const handleScreenShot = () => {
		if (containerRef?.current) {
			takeScreenshot(containerRef?.current);
			const a = document.createElement('a');
			a.href = image;
			a.download = createFileName('png', 'guitar-tab');
			a.click();
		}
	};

	const handleToggleScales = (scale: string) => {
		if (activeScale === scale) {
			updateActiveScale('');
			updateFretMap(defaultFretMap);
			return;
		}
		if (scales?.[scale]) {
			updateActiveScale(scale);
			updateFretMap(scales?.[scale]);
		}
	};

	console.log(fretMap);

	return (
		<div className="fret-board-outer-wrapper">
			<div className="fret-board-inner-wrapper">
				<div className="fret-board-wrapper" ref={containerRef}>
					<div
						className={`${
							isFretNumbersEnabled ? '' : 'fret-numbers-hidden'
						} fret-numbers`}
					>
						<div className="fret-number">1</div>
						<div className="fret-number">2</div>
						<div className="fret-number">3</div>
						<div className="fret-number">4</div>
						<div className="fret-number">5</div>
						<div className="fret-number">6</div>
						<div className="fret-number">7</div>
						<div className="fret-number">8</div>
						<div className="fret-number">9</div>
						<div className="fret-number">10</div>
						<div className="fret-number">11</div>
						<div className="fret-number">12</div>
						<div className="fret-number">13</div>
						<div className="fret-number">14</div>
						<div className="fret-number">15</div>
						<div className="fret-number">16</div>
						<div className="fret-number">17</div>
						<div className="fret-number">18</div>
						<div className="fret-number">19</div>
						<div className="fret-number">20</div>
						<div className="fret-number">21</div>
						<div className="fret-number">22</div>
					</div>
					<div
						className={`${
							isFretNotesEnabled ? '' : 'fret-board-container-hidden'
						} fret-board-container`}
					>
						<div className="fret-board-open-notes">
							{openNotes.map(el => (
								<div
									key={el.id}
									onClick={handleClickNote}
									className={`${
										fretMap[el.id] === 1
											? 'item-active'
											: fretMap[el.id] === 2
											? 'item-active-root'
											: ''
									} item ${el.isLastRow ? 'item-row-last' : ''}`}
									data-id={el.id}
								>
									<p>{el.title}</p>
								</div>
							))}
							<div className="string string-6"></div>
							<div className="string string-5"></div>
							<div className="string string-4"></div>
							<div className="string string-3"></div>
							<div className="string string-2"></div>
							<div className="string string-1"></div>
						</div>
						<div className="fret-board">
							{closedNotes.map(el => (
								<div
									key={el.id}
									onClick={handleClickNote}
									className={`${
										fretMap[el.id] === 1
											? 'item-active'
											: fretMap[el.id] === 2
											? 'item-active-root'
											: ''
									} item ${el.isLastRow ? 'item-row-last' : ''}`}
									data-id={el.id}
								>
									<p>{el.title}</p>
								</div>
							))}
							<div className="string string-6"></div>
							<div className="string string-5"></div>
							<div className="string string-4"></div>
							<div className="string string-3"></div>
							<div className="string string-2"></div>
							<div className="string string-1"></div>
							<div className="dots dots-1">
								<div className="dot"></div>
							</div>
							<div className="dots dots-2">
								<div className="dot"></div>
							</div>
							<div className="dots dots-3">
								<div className="dot"></div>
							</div>
							<div className="dots dots-4">
								<div className="dot"></div>
							</div>
							<div className="dots dots-5">
								<div className="dot"></div>
								<div className="dot"></div>
							</div>
							<div className="dots dots-6">
								<div className="dot"></div>
							</div>
							<div className="dots dots-7">
								<div className="dot"></div>
							</div>
							<div className="dots dots-8">
								<div className="dot"></div>
							</div>
							<div className="dots dots-9">
								<div className="dot"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<FretToolbar
				activeScale={activeScale}
				onClickMarker={onClickMarker}
				activeMarker={selectedMarker}
				onToggleFrets={handleToggleFrets}
				onToggleNotes={handleToggleNotes}
				onToggleScales={handleToggleScales}
				onClickScreenShot={handleScreenShot}
			/>
		</div>
	);
};

export default FretBoard;
