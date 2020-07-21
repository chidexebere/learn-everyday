import React from "react";
import PropTypes from "prop-types";

const Button = ({
	type,
	handleClick,
	isDisabled,
	value,
	text,
	children,
	correct,
	userClicked,
}) => {
	// const handleOnClick = () => {
	// 	handleClick(parameter);
	// };

	const customColor = correct
		? `is-success`
		: !correct && userClicked
		? `is-danger`
		: `is-info`;

	const computedClass = `button ${type} ${customColor} `;

	return (
		<button
			disabled={isDisabled}
			className={computedClass}
			value={value}
			onClick={handleClick}
		>
			{text}
			{children}
		</button>
	);
};

Button.propTypes = {
	type: PropTypes.string,
	value: PropTypes.string,
	text: PropTypes.string,
	handleClick: PropTypes.func,
	isDisabled: PropTypes.bool,
};

export default Button;
