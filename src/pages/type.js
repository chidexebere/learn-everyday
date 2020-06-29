import React from "react";
import Box from "../elements/Box";

const Type = () => {
	return (
		<div className="home">
			<h2 className="home__title">Select Quiz Type</h2>
			<Box text="WAEC">
				<span className="icon">
					<i className="fa fa-chevron-right"></i>
				</span>
			</Box>
			<Box text="JAMB">
				<span className="icon">
					<i className="fa fa-chevron-right"></i>
				</span>
			</Box>
			<Box text="NECO">
				<span className="icon">
					<i className="fa fa-chevron-right"></i>
				</span>
			</Box>
		</div>
	);
};

export default Type;
