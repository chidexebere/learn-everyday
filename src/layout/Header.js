import React from "react";
import PropTypes from "prop-types";

const Header = ({
	type,
	parameter,
	handleClick,
	isDisabled,
	text,
	children,
}) => {
	const computedClass = `navbar ${type}`;

	const handleOnClick = () => {
		handleClick(parameter);
	};

	return (
		<header
			disabled={isDisabled}
			className={computedClass}
			onClick={handleClick ? handleOnClick : () => {}}
		>
			{text}
			{children}
		</header>
	);
};

Header.propTypes = {
	type: PropTypes.string,
	text: PropTypes.string.isRequired,
	handleClick: PropTypes.func,
	isDisabled: PropTypes.bool,
};

export default Header;
