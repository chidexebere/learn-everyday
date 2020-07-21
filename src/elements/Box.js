import React from "react";
import PropTypes from "prop-types";

const Box = ({ type, isDisabled, text, children }) => {
	const computedClass = `box ${type}`;

	return (
		<div disabled={isDisabled} className={computedClass}>
			{text}
			{children}
		</div>
	);
};

Box.propTypes = {
	type: PropTypes.string,
	text: PropTypes.string,
	isDisabled: PropTypes.bool,
};

export default Box;
