import React from "react";
import Button from "../elements/Button";

const Quiz = () => {
	return (
		<div className="home">
			{/* <div className="quiz container">
				<div className="notification">What is the capital of Nigeria</div>
			</div> */}

			<article className="quiz message">
				<div className="message-header">
					<p>Question 1</p>
				</div>
				<div className="message-body">
					What is the capital of Nigeria What is the capital of Nigeria What is
					the capital of Nigeria
				</div>
			</article>
			<div className="buttons answers">
				<Button type="buttonAnswer is-info " text="A" />
				<Button type="buttonAnswer is-success" text="B" />
				<Button type="buttonAnswer is-warning" text="C" />
				<Button type="buttonAnswer is-danger" text="D" />
			</div>
		</div>
	);
};

export default Quiz;
