import React from "react";
import Button from "../elements/Button";

const Quiz = () => {
	return (
		<div className="home">
			<div className="quiz container">
				<div className="notification">What is the capital of Nigeria</div>
			</div>
			<div className="buttons">
				<Button type="is-info" text="A" />
				<Button type="is-success" text="B" />
				<Button type="is-warning" text="C" />
				<Button type="is-danger" text="D" />
			</div>
		</div>
	);
};

export default Quiz;
