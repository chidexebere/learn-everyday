import React from "react";
import PropTypes from "prop-types";

const Footer = ({ type, isDisabled, children }) => {
	const computedClass = `footer ${type}`;

	return (
		<footer disabled={isDisabled} className={computedClass}>
			{children}
		</footer>
	);
};

Footer.propTypes = {
	type: PropTypes.string,
	isDisabled: PropTypes.bool,
};

export default Footer;
