import React from "react";
import "../App.css";

export default function AllWaves({ wave }) {
	return (
		<div>
			<div>Message: {wave.message}</div>
			<div>Address: {wave.address}</div>
			<div>Timestamp: {wave.timestamp.toString()}</div>
		</div>
	);
}
