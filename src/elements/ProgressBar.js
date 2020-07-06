import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ isDisabled, type }) => {
	const computedClass = `progress ${type}`;

	const [count, setCount] = useState(0);
	let interval = null;
	// let myInterval = interval.current;

	const startTimer = () => {
		interval = setInterval(() => {
			if (count < 100) {
				const updatedCount = count + 1;
				setCount(updatedCount);
			}
		}, 1000);
	};

	useEffect(() => {
		startTimer();
		return () => {
			clearInterval(interval);
		};
	});
	let value = count.toString();
	console.log(count);
	// console.log(value);
	// console.log(myInterval);
	return (
		<progress
			id="progressBar"
			disabled={isDisabled}
			className={computedClass}
			value={count.toString()}
			// value="10"
			max="100"
		></progress>
	);
};

ProgressBar.propTypes = {
	isDisabled: PropTypes.bool,
	type: PropTypes.string,
	value: PropTypes.string,
};

export default ProgressBar;
