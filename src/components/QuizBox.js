import React from "react";
import Button from "../elements/Button";

const QuizBox = ({
	questionAnswered,
	section,
	question,
	options,
	userAnswer,
	checkAnswer,
}) => {
	return (
		<div className="container">
			<article className="QuizBox message">
				<p>Question {questionAnswered}</p>

				<div className="message-header">
					<p
						dangerouslySetInnerHTML={{
							__html: section,
						}}
					/>
				</div>
				<div className="message-body">
					<p
						dangerouslySetInnerHTML={{
							__html: question,
						}}
					/>
				</div>
			</article>
			<div className="buttons answers">
				{options.map((answer) => (
					<Button
						key={answer}
						type={`buttonAnswer`}
						text={answer}
						isDisabled={userAnswer ? true : false}
						value={answer}
						handleClick={checkAnswer}
						correct={userAnswer?.correctAnswer === answer}
						userClicked={userAnswer?.selectedAnswer === answer}
					/>
				))}
			</div>
		</div>
	);
};

export default QuizBox;
