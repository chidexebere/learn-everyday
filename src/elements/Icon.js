import React from "react";
import PropTypes from "prop-types";

const Icon = ({ type, fontType, parameter, handleClick, isDisabled }) => {
	const computedClass = `icon ${type}`;
	const fontClass = `${fontType}`;

	const handleOnClick = () => {
		handleClick(parameter);
	};

	return (
		<span
			disabled={isDisabled}
			className={computedClass}
			onClick={handleClick ? handleOnClick : () => {}}
		>
			<i className={fontClass}></i>
		</span>
	);
};

Icon.propTypes = {
	type: PropTypes.string,
	fontType: PropTypes.string,
	handleClick: PropTypes.func,
	isDisabled: PropTypes.bool,
};

export default Icon;
