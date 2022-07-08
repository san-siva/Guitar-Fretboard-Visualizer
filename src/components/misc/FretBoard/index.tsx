import React, { useState, useRef } from 'react';
import _ from 'lodash';

import FretToolbar from '../FretToolBar';
import { useScreenshot, createFileName } from 'use-react-screenshot';

import {
	randomStringGenerator,
	defaultFretMap,
	scales,
	closedNotes,
	openNotes
} from '../../../utils/defaults';
import './index.scss';

type FRET_MAP_OBJ = {
	[key: string]: string | number;
};

type FRET_MAP = Array<FRET_MAP_OBJ>;

const FretBoard = () => {
	const containerRef = useRef(null);
	const [image, takeScreenshot] = useScreenshot();
	const [activeScale, updateActiveScale] = useState('');

	const [activeFret, updateActiveFret] = useState('default');
	const [fretMaps, updateFretmaps] = useState<FRET_MAP>([defaultFretMap]);

	const [selectedMarker, updateSelectedMarker] = useState(2);
	const [isFretNotesEnabled, toggleFretNotes] = useState(true);
	const [isFretNumbersEnabled, toggleFretNumbers] = useState(true);

	const resetScale = (newFretMap: any) => {
		const fretClone = { ...newFretMap };
		delete fretClone.id;
		_.forEach(scales, (value, key) => {
			if (JSON.stringify(value) === JSON.stringify(fretClone)) {
				updateActiveScale(key);
			}
		});
	};

	const handleClickNote = (e: any) => {
		const id = e.currentTarget.getAttribute('data-id') as string;
		updateFretmaps(prevState => {
			const prevFretMap = fretMaps.find(el => el.id === activeFret)!;
			const newFretMap = {
				...prevFretMap,
				[id]: prevFretMap[id] === selectedMarker ? 0 : selectedMarker
			};
			updateActiveScale('');
			resetScale(newFretMap);
			return prevState.map(el => (el.id === activeFret ? newFretMap : el));
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
		if (scales?.[scale]) {
			updateActiveScale(scale);
			updateFretmaps(prevState => {
				const isAlreadyActive = activeScale === scale;
				if (isAlreadyActive) updateActiveScale('');
				return prevState.map((el, index) =>
					el.id === activeFret
						? {
								...(isAlreadyActive ? defaultFretMap : scales?.[scale]),
								id: activeFret
						  }
						: el
				);
			});
			return;
		}
	};

	const handleToggleFretBoard = (e: any) => {
		const fretBoardId = e.currentTarget.getAttribute('data-id') as string;
		const fretBoardIndex = +e.currentTarget.getAttribute(
			'data-index'
		) as number;
		updateFretmaps(prevVal => {
			const currentFretBoard = prevVal.find(el => el.id === fretBoardId);
			if (fretBoardIndex + 1 === prevVal.length) {
				const newId = randomStringGenerator();
				const newValue = [...prevVal, { ...defaultFretMap, id: newId }];
				updateActiveScale('');
				return newValue;
			}
			if (currentFretBoard) {
				const newValue = prevVal.filter(el => el.id !== fretBoardId) as any;
				updateActiveFret(newValue[newValue.length - 1]?.id);
				return newValue;
			}
		});
	};

	const handleToggleFretBoardActive = (e: any) => {
		const fretBoardId = e.currentTarget.getAttribute('data-id') as string;
		if (fretBoardId) {
			resetScale(fretMaps.find(el => el.id === fretBoardId));
			updateActiveFret(fretBoardId);
		}
	};

	return (
		<div className="fret-board-outer-wrapper">
			{fretMaps.map((fret, fretIndex, allFretBoards) => (
				<div key={fret.id} className="fret-board-inner-wrapper">
					<button
						data-id={fret.id}
						onClick={handleToggleFretBoardActive}
						className={`fret-board-selector ${
							fret.id === activeFret ? 'fret-board-selector-active' : ''
						}`}
					>
						<div />
					</button>
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
											fret[el.id] === 1
												? 'item-active'
												: fret[el.id] === 2
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
											fret[el.id] === 1
												? 'item-active'
												: fret[el.id] === 2
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
					<button
						className="new-fret-toggle"
						data-id={fret.id}
						data-index={fretIndex}
						onClick={handleToggleFretBoard}
					>
						{allFretBoards[fretIndex + 1] ? '-' : '+'}
					</button>
				</div>
			))}
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
