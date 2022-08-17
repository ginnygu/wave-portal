import React from "react";
import "../App.css";

export default function AllWaves({ wave }) {
	const { message, address, timestamp } = wave;
	return (
		<div>
			<div>Message: {message}</div>
			<div>Address: {address}</div>
			<div>Timestamp: {timestamp.toString()}</div>
		</div>
	);
}
