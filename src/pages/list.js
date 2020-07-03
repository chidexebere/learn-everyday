import React from "react";
import Box from "../elements/Box";
// import mathsLogo from "../images/maths.jpg";

const List = () => {
	return (
		<div className="list">
			<h2 className="home__title">Select Question</h2>
			<div className="tile">
				<Box text="Math">
					<span className="icon">
						<i className="fa fa-chevron-right"></i>
					</span>
				</Box>
				<Box text="English">
					<span className="icon">
						<i className="fa fa-chevron-right"></i>
					</span>
				</Box>
				<Box text="Biology">
					<span className="icon">
						<i className="fa fa-chevron-right"></i>
					</span>
				</Box>
				<Box text="Math">
					<span className="icon">
						<i className="fa fa-chevron-right"></i>
					</span>
				</Box>
				<Box text="English">
					<span className="icon">
						<i className="fa fa-chevron-right"></i>
					</span>
				</Box>
				<Box text="Biology">
					<span className="icon">
						<i className="fa fa-chevron-right"></i>
					</span>
				</Box>
			</div>
			{/* <Button text="MATH" type="is-primary is-rounded" />
			<h2 className="home__title">Click To Begin</h2> */}
		</div>
	);
};

export default List;
