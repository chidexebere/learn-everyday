import React from "react";
import PropTypes from "prop-types";

const Header = ({ type, isDisabled, children }) => {
	const computedClass = `header ${type}`;

	return (
		<header disabled={isDisabled} className={computedClass}>
			{children}
		</header>
	);
};

Header.propTypes = {
	type: PropTypes.string,
	isDisabled: PropTypes.bool,
};

export default Header;
