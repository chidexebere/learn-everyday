import React, { useState } from "react";
import { fetchQuizQuestions } from "../api/fetchData";
import QuizBox from "../components/QuizBox";
import Header from "../layout/Header";
import ProgressBar from "../elements/ProgressBar";
import Box from "../elements/Box";
import Icon from "../elements/Icon";

const Quiz = () => {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [number, setNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);

	const totalQuestions = 5;
	const subject = `english`;
	const year = 2010;
	const type = `utme`;

	const startTrivia = async () => {
		setLoading(true);
		setGameOver(false);
		const newQuestions = await fetchQuizQuestions(
			totalQuestions,
			subject,
			year,
			type
		);
		setQuestions(newQuestions);
		setScore(0);
		setUserAnswers([]);
		setNumber(0);
		setLoading(false);
	};

	const filterAnswer = (options, answer) => {
		const optionKeys = Object.entries(options).map(([key]) => key);
		const filteredAnswerIndex = optionKeys.indexOf(answer);
		const optionValues = Object.entries(options).map(([key, value]) => value);
		return optionValues[filteredAnswerIndex];
	};

	const checkAnswer = (e) => {
		if (!gameOver) {
			// User's answer
			const selected = e.currentTarget.value;
			const answer = questions.data[number].answer;

			// Check answer against correct answer
			const options = questions.data[number].option;
			const isCorrect = selected === filterAnswer(options, answer);

			// Add score if answer is isCorrect
			if (isCorrect) setScore((prev) => prev + 1);

			// Save the answer in the array for user answers
			const answerObject = {
				question: questions.data[number].question,
				isCorrect,
				correctAnswer: filterAnswer(options, answer),
				selectedAnswer: selected,
			};
			setUserAnswers((prev) => [...prev, answerObject]);
		}
	};

	const nextQuestion = () => {
		// Move on to the next question if not the last question
		const nextQ = number + 1;

		if (nextQ === totalQuestions) {
			setGameOver(true);
		} else {
			setNumber(nextQ);
		}
	};

	const scoreBoard = `${score} / ${number + 1}`;

	return (
		<div className="home">
			{gameOver || userAnswers.length === totalQuestions ? (
				<button className="start" onClick={startTrivia}>
					Start
				</button>
			) : null}
			{!gameOver ? (
				// <p className="score">
				// 	Score: {score} / {number + 1}
				// </p>

				<Header>
					<ProgressBar type="is-success" />
					<div className="header__buttom">
						<Box type="scoreBoard" text={scoreBoard} />
						<Icon type="iconButton" fontType="fa fa-pause " />
					</div>
				</Header>
			) : null}
			{loading ? <p>Loading Questions...</p> : null}

			{!loading && !gameOver && (
				<QuizBox
					questionAnswered={number + 1}
					section={questions.data[number].section}
					question={questions.data[number].question}
					options={Object.values(questions.data[number].option)}
					userAnswer={userAnswers ? userAnswers[number] : undefined}
					checkAnswer={checkAnswer}
				/>
			)}

			{!gameOver &&
			!loading &&
			userAnswers.length === number + 1 &&
			number !== totalQuestions - 1 ? (
				<button className="next" onClick={nextQuestion}>
					Next Question
				</button>
			) : null}
		</div>
	);
};

export default Quiz;
