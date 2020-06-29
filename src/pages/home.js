import React from "react";
import Box from "../elements/Box";

const Home = () => {
	return (
		<div className="home">
			<h2 className="home__title">Select Quiz</h2>
			<Box text="Past Questions">
				<span className="icon">
					<i className="fa fa-chevron-right"></i>
				</span>
			</Box>
			<Box text="World History">
				<span className="icon">
					<i className="fa fa-chevron-right"></i>
				</span>
			</Box>
			<Box text="Nigerian History">
				<span className="icon">
					<i className="fa fa-chevron-right"></i>
				</span>
			</Box>
		</div>
	);
};

export default Home;
