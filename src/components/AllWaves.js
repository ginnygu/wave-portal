import React from 'react';
import '../App.css';

export default function AllWaves({ wave }) {
	return (
		<div className="wave" key={wave.timestamp.toString()}>
			<div>Message: {wave.message}</div>
			<div>Address: {wave.address}</div>
			<div>Timestamp: {wave.timestamp.toString()}</div>
		</div>
	);
}
