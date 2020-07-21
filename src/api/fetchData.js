import PropTypes from "prop-types";

export const fetchQuizQuestions = async (
	totalQuestions,
	subject,
	year,
	type
) => {
	try {
		const endpoint = `https://questions.aloc.ng/api/q/${totalQuestions}?subject=${subject}&year=${year}&type=${type}`;
		const data = await (await fetch(endpoint)).json();
		return data;
	} catch (error) {
		alert(error); // catches both errors
	}
};

fetchQuizQuestions.propTypes = {
	totalQuestions: PropTypes.number,
	subject: PropTypes.string,
	year: PropTypes.number,
	type: PropTypes.string,
};
