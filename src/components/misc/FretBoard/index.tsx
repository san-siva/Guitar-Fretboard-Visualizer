import React, { useState, useRef } from 'react';
import FretToolbar from '../FretToolBar';
import { useScreenshot, createFileName } from 'use-react-screenshot';

import './index.scss';

const FretBoard = () => {
	const containerRef = useRef(null);
	const [image, takeScreenshot] = useScreenshot();

	const [fretMap, updateFretMap] = useState<{ [T: string]: number }>({
		'e-0': 0,
		'a-0': 0,
		'd-0': 0,
		'g-0': 0,
		'b-0': 0,
		'e-01': 0,
		'f-1': 0,
		'f#-1': 0,
		'g-1': 0,
		'g#-1': 0,
		'a-1': 0,
		'a#-1': 0,
		'b-1': 0,
		'c-1': 0,
		'c#-1': 0,
		'd-1': 0,
		'd#-1': 0,
		'e-1': 0,
		'f-11': 0,
		'f#-11': 0,
		'g-11': 0,
		'g#-11': 0,
		'a-11': 0,
		'a#-11': 0,
		'b-11': 0,
		'c-11': 0,
		'c#-11': 0,
		'd-11': 0,
		'a#-2': 0,
		'b-2': 0,
		'c-2': 0,
		'c#-2': 0,
		'd-2': 0,
		'd#-2': 0,
		'e-2': 0,
		'f-2': 0,
		'f#-2': 0,
		'g-2': 0,
		'g#-2': 0,
		'a-2': 0,
		'a#-21': 0,
		'b-21': 0,
		'c-21': 0,
		'c#-21': 0,
		'd-21': 0,
		'd#-21': 0,
		'e-21': 0,
		'f-21': 0,
		'f#-21': 0,
		'g-21': 0,
		'd#-3': 0,
		'e-3': 0,
		'f-3': 0,
		'f#-3': 0,
		'g-3': 0,
		'g#-3': 0,
		'a-3': 0,
		'a#-3': 0,
		'b-3': 0,
		'c-3': 0,
		'c#-3': 0,
		'd-3': 0,
		'd#-31': 0,
		'e-31': 0,
		'f-31': 0,
		'f#-31': 0,
		'g-31': 0,
		'g#-31': 0,
		'a-31': 0,
		'a#-31': 0,
		'b-31': 0,
		'c-31': 0,
		'g#-4': 0,
		'a-4': 0,
		'a#-4': 0,
		'b-4': 0,
		'c-4': 0,
		'c#-4': 0,
		'd-4': 0,
		'd#-4': 0,
		'e-4': 0,
		'f-4': 0,
		'f#-4': 0,
		'g-4': 0,
		'g#-41': 0,
		'a-41': 0,
		'a#-41': 0,
		'b-41': 0,
		'c-41': 0,
		'c#-41': 0,
		'd-41': 0,
		'd#-41': 0,
		'e-41': 0,
		'f-41': 0,
		'c-5': 0,
		'c#-5': 0,
		'd-5': 0,
		'd#-5': 0,
		'e-5': 0,
		'f-5': 0,
		'f#-5': 0,
		'g-5': 0,
		'g#-5': 0,
		'a-5': 0,
		'a#-5': 0,
		'b-5': 0,
		'c-51': 0,
		'c#-51': 0,
		'd-51': 0,
		'd#-51': 0,
		'e-51': 0,
		'f-51': 0,
		'f#-51': 0,
		'g-51': 0,
		'g#-51': 0,
		'a-51': 0,
		'f-6': 0,
		'f#-6': 0,
		'g-6': 0,
		'g#-6': 0,
		'a-6': 0,
		'a#-6': 0,
		'b-6': 0,
		'c-6': 0,
		'c#-6': 0,
		'd-6': 0,
		'd#-6': 0,
		'e-6': 0,
		'f-61': 0,
		'f#-61': 0,
		'g-61': 0,
		'g#-61': 0,
		'a-61': 0,
		'a#-61': 0,
		'b-61': 0,
		'c-61': 0,
		'c#-61': 0,
		'd-61': 0
	});
	const [selectedMarker, updateSelectedMarker] = useState(2);
	const [isFretNotesEnabled, toggleFretNotes] = useState(true);
	const [isFretNumbersEnabled, toggleFretNumbers] = useState(true);

	const handleClickNote = (e: any) => {
		const id = e.currentTarget.getAttribute('data-id') as string;
		console.log(id, fretMap[id]);
		updateFretMap(prevState => ({
			...prevState,
			[id]: prevState[id] === selectedMarker ? 0 : selectedMarker
		}));
	};

	const onClickMarker = (isBasic: boolean) => {
		updateSelectedMarker(isBasic ? 1 : 2);
	};

	const openNotes = [
		{ id: 'e-0', title: 'E', isLastRow: true },
		{ id: 'a-0', title: 'A', isLastRow: true },
		{ id: 'd-0', title: 'D', isLastRow: true },
		{ id: 'g-0', title: 'G', isLastRow: true },
		{ id: 'b-0', title: 'B', isLastRow: true },
		{ id: 'e-01', title: 'E', isLastRow: true }
	];
	const closedNotes = [
		{ id: 'f-1', title: 'F', isLastRow: false },
		{ id: 'f#-1', title: 'F#', isLastRow: false },
		{ id: 'g-1', title: 'G', isLastRow: false },
		{ id: 'g#-1', title: 'G#', isLastRow: false },
		{ id: 'a-1', title: 'A', isLastRow: false },
		{ id: 'a#-1', title: 'A#', isLastRow: false },
		{ id: 'b-1', title: 'B', isLastRow: false },
		{ id: 'c-1', title: 'C', isLastRow: false },
		{ id: 'c#-1', title: 'C#', isLastRow: false },
		{ id: 'd-1', title: 'D', isLastRow: false },
		{ id: 'd#-1', title: 'D#', isLastRow: false },
		{ id: 'e-1', title: 'E', isLastRow: false },
		{ id: 'f-11', title: 'F', isLastRow: false },
		{ id: 'f#-11', title: 'F#', isLastRow: false },
		{ id: 'g-11', title: 'G', isLastRow: false },
		{ id: 'g#-11', title: 'G#', isLastRow: false },
		{ id: 'a-11', title: 'A', isLastRow: false },
		{ id: 'a#-11', title: 'A#', isLastRow: false },
		{ id: 'b-11', title: 'B', isLastRow: false },
		{ id: 'c-11', title: 'C', isLastRow: false },
		{ id: 'c#-11', title: 'C#', isLastRow: false },
		{ id: 'd-11', title: 'D', isLastRow: true },
		{ id: 'a#-2', title: 'A#', isLastRow: false },
		{ id: 'b-2', title: 'B', isLastRow: false },
		{ id: 'c-2', title: 'C', isLastRow: false },
		{ id: 'c#-2', title: 'C#', isLastRow: false },
		{ id: 'd-2', title: 'D', isLastRow: false },
		{ id: 'd#-2', title: 'D#', isLastRow: false },
		{ id: 'e-2', title: 'E', isLastRow: false },
		{ id: 'f-2', title: 'F', isLastRow: false },
		{ id: 'f#-2', title: 'F#', isLastRow: false },
		{ id: 'g-2', title: 'G', isLastRow: false },
		{ id: 'g#-2', title: 'G#', isLastRow: false },
		{ id: 'a-2', title: 'A', isLastRow: false },
		{ id: 'a#-21', title: 'A#', isLastRow: false },
		{ id: 'b-21', title: 'B', isLastRow: false },
		{ id: 'c-21', title: 'C', isLastRow: false },
		{ id: 'c#-21', title: 'C#', isLastRow: false },
		{ id: 'd-21', title: 'D', isLastRow: false },
		{ id: 'd#-21', title: 'D#', isLastRow: false },
		{ id: 'e-21', title: 'E', isLastRow: false },
		{ id: 'f-21', title: 'F', isLastRow: false },
		{ id: 'f#-21', title: 'F#', isLastRow: false },
		{ id: 'g-21', title: 'G', isLastRow: true },
		{ id: 'd#-3', title: 'D#', isLastRow: false },
		{ id: 'e-3', title: 'E', isLastRow: false },
		{ id: 'f-3', title: 'F', isLastRow: false },
		{ id: 'f#-3', title: 'F#', isLastRow: false },
		{ id: 'g-3', title: 'G', isLastRow: false },
		{ id: 'g#-3', title: 'G#', isLastRow: false },
		{ id: 'a-3', title: 'A', isLastRow: false },
		{ id: 'a#-3', title: 'A#', isLastRow: false },
		{ id: 'b-3', title: 'B', isLastRow: false },
		{ id: 'c-3', title: 'C', isLastRow: false },
		{ id: 'c#-3', title: 'C#', isLastRow: false },
		{ id: 'd-3', title: 'D', isLastRow: false },
		{ id: 'd#-31', title: 'D#', isLastRow: false },
		{ id: 'e-31', title: 'E', isLastRow: false },
		{ id: 'f-31', title: 'F', isLastRow: false },
		{ id: 'f#-31', title: 'F#', isLastRow: false },
		{ id: 'g-31', title: 'G', isLastRow: false },
		{ id: 'g#-31', title: 'G#', isLastRow: false },
		{ id: 'a-31', title: 'A', isLastRow: false },
		{ id: 'a#-31', title: 'A#', isLastRow: false },
		{ id: 'b-31', title: 'B', isLastRow: false },
		{ id: 'c-31', title: 'C', isLastRow: true },
		{ id: 'g#-4', title: 'G#', isLastRow: false },
		{ id: 'a-4', title: 'A', isLastRow: false },
		{ id: 'a#-4', title: 'A#', isLastRow: false },
		{ id: 'b-4', title: 'B', isLastRow: false },
		{ id: 'c-4', title: 'C', isLastRow: false },
		{ id: 'c#-4', title: 'C#', isLastRow: false },
		{ id: 'd-4', title: 'D', isLastRow: false },
		{ id: 'd#-4', title: 'D#', isLastRow: false },
		{ id: 'e-4', title: 'E', isLastRow: false },
		{ id: 'f-4', title: 'F', isLastRow: false },
		{ id: 'f#-4', title: 'F#', isLastRow: false },
		{ id: 'g-41', title: 'G', isLastRow: false },
		{ id: 'g#-41', title: 'G#', isLastRow: false },
		{ id: 'a-41', title: 'A', isLastRow: false },
		{ id: 'a#-41', title: 'A#', isLastRow: false },
		{ id: 'b-41', title: 'B', isLastRow: false },
		{ id: 'c-41', title: 'C', isLastRow: false },
		{ id: 'c#-41', title: 'C#', isLastRow: false },
		{ id: 'd-41', title: 'D', isLastRow: false },
		{ id: 'd#-41', title: 'D#', isLastRow: false },
		{ id: 'e-41', title: 'E', isLastRow: false },
		{ id: 'f-41', title: 'F', isLastRow: true },
		{ id: 'c-5', title: 'C', isLastRow: false },
		{ id: 'c#-5', title: 'C#', isLastRow: false },
		{ id: 'd-5', title: 'D', isLastRow: false },
		{ id: 'd#-5', title: 'D#', isLastRow: false },
		{ id: 'e-5', title: 'E', isLastRow: false },
		{ id: 'f-5', title: 'F', isLastRow: false },
		{ id: 'f#-5', title: 'f#', isLastRow: false },
		{ id: 'g-5', title: 'G', isLastRow: false },
		{ id: 'g#-5', title: 'g#', isLastRow: false },
		{ id: 'a-5', title: 'A', isLastRow: false },
		{ id: 'a#-5', title: 'a#', isLastRow: false },
		{ id: 'b-5', title: 'B', isLastRow: false },
		{ id: 'c-51', title: 'C', isLastRow: false },
		{ id: 'c#-51', title: 'c#', isLastRow: false },
		{ id: 'd-51', title: 'D', isLastRow: false },
		{ id: 'd#-51', title: 'd#', isLastRow: false },
		{ id: 'e-51', title: 'E', isLastRow: false },
		{ id: 'f-51', title: 'F', isLastRow: false },
		{ id: 'f#-51', title: 'f#', isLastRow: false },
		{ id: 'g-51', title: 'G', isLastRow: false },
		{ id: 'g#-51', title: 'g#', isLastRow: false },
		{ id: 'a-51', title: 'A', isLastRow: true },
		{ id: 'f-6', title: 'F', isLastRow: false },
		{ id: 'f#-6', title: 'f#', isLastRow: false },
		{ id: 'g-6', title: 'G', isLastRow: false },
		{ id: 'g#-6', title: 'g#', isLastRow: false },
		{ id: 'a-6', title: 'A', isLastRow: false },
		{ id: 'a#-6', title: 'a#', isLastRow: false },
		{ id: 'b-6', title: 'B', isLastRow: false },
		{ id: 'c-6', title: 'C', isLastRow: false },
		{ id: 'c#-6', title: 'c#', isLastRow: false },
		{ id: 'd-6', title: 'D', isLastRow: false },
		{ id: 'd#-6', title: 'd#', isLastRow: false },
		{ id: 'e-6', title: 'E', isLastRow: false },
		{ id: 'f-61', title: 'F', isLastRow: false },
		{ id: 'f#-61', title: 'f#', isLastRow: false },
		{ id: 'g-61', title: 'G', isLastRow: false },
		{ id: 'g#-61', title: 'g#', isLastRow: false },
		{ id: 'a-61', title: 'A', isLastRow: false },
		{ id: 'a#-61', title: 'a#', isLastRow: false },
		{ id: 'b-61', title: 'B', isLastRow: false },
		{ id: 'c-61', title: 'C', isLastRow: false },
		{ id: 'c#-61', title: 'c#', isLastRow: false },
		{ id: 'd-61', title: 'D', isLastRow: true }
	];

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

	return (
		<div className="fret-board-outer-wrapper">
			<div className="fret-board-inner-wrapper" ref={containerRef}>
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
			<FretToolbar
				onClickMarker={onClickMarker}
				activeMarker={selectedMarker}
				onToggleFrets={handleToggleFrets}
				onToggleNotes={handleToggleNotes}
				onClickScreenShot={handleScreenShot}
			/>
		</div>
	);
};

export default FretBoard;
