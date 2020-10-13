import React from "react";
import { Link } from "react-router-dom";

import Button from "../elements/Button";
import Icon from "../elements/Icon";

const Type = () => {
	return (
		<div className="home">
			<h2 className="home__title">Select Quiz Type</h2>
			<Link to="/select">
				<Button type="buttonTitle" text="WAEC">
					<Icon fontType="fa fa-chevron-right" />
				</Button>
			</Link>
			<Button type="buttonTitle" text="JAMB">
				<Icon fontType="fa fa-chevron-right" />
			</Button>
			<Button type="buttonTitle" text="NECO">
				<Icon fontType="fa fa-chevron-right" />
			</Button>
		</div>
	);
};

export default Type;
