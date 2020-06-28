import React from "react";
import PropTypes from "prop-types";

const Box = ({ type, parameter, handleClick, isDisabled, text }) => {
	const computedClass = `box ${type}`;

	const handleOnClick = () => {
		handleClick(parameter);
	};

	return (
		<div
			disabled={isDisabled}
			className={computedClass}
			onClick={handleClick ? handleOnClick : () => {}}
		>
			{text}
		</div>
	);
};

Box.propTypes = {
	type: PropTypes.string,
	text: PropTypes.string.isRequired,
	handleClick: PropTypes.func,
	isDisabled: PropTypes.bool,
};

export default Box;
