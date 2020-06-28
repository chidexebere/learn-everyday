import React from "react";
import PropTypes from "prop-types";

const NavBar = ({
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
		<nav
			disabled={isDisabled}
			className={computedClass}
			onClick={handleClick ? handleOnClick : () => {}}
		>
			{text}
			{children}
		</nav>
	);
};

NavBar.propTypes = {
	type: PropTypes.string,
	text: PropTypes.string.isRequired,
	handleClick: PropTypes.func,
	isDisabled: PropTypes.bool,
};

export default NavBar;
