import React from "react";
import PropTypes from "prop-types";

const Footer = ({
	type,
	parameter,
	handleClick,
	isDisabled,
	text,
	children,
}) => {
	const computedClass = `footer ${type}`;

	const handleOnClick = () => {
		handleClick(parameter);
	};

	return (
		<footer
			disabled={isDisabled}
			className={computedClass}
			onClick={handleClick ? handleOnClick : () => {}}
		>
			{text}
			{children}
		</footer>
	);
};

Footer.propTypes = {
	type: PropTypes.string,
	text: PropTypes.string.isRequired,
	handleClick: PropTypes.func,
	isDisabled: PropTypes.bool,
};

export default Footer;
