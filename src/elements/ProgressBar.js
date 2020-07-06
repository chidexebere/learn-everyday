import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ isDisabled, type }) => {
	const computedClass = `progress ${type}`;

	const [count, setCount] = useState(0);
	let interval = null;

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

	return (
		<progress
			id="progressBar"
			disabled={isDisabled}
			className={computedClass}
			value={count.toString()}
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
