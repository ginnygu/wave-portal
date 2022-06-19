import React from 'react';

export default function WaveBox({ message, setMessage, wave }) {
	return (
		<div className="wave-box">
			<label> Message For Me!</label>
			<br />
			<textarea
				value={message}
				onChange={(e) => {
					setMessage(e.target.value);
				}}
			/>
			<br />
			<button onClick={wave}>Wave at me!</button>
		</div>
	);
}
