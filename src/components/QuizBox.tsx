import React from 'react';
import Box from '../elements/Box';
import Button from '../elements/Button';
import { AnswerObject } from '../utils/types';

interface QuizBoxProps {
  /** question number to be answered in the quiz box*/
  questionAnswered?: string | number;
  /** section of question to be answered in the quiz box*/
  section: string;
  /** question to be answered in the quiz box*/
  question: string;
  /** options  for question to be answered in the quiz box*/
  options: string[];
  /** user answer*/
  userAnswer: AnswerObject;
  /** callback function passed to the onClick handler*/
  checkAnswer: (event: React.MouseEvent<HTMLElement>) => void;
  /** Selected question information*/
  infoBox: string;
}

const QuizBox: React.FC<QuizBoxProps> = ({
  section,
  question,
  options,
  userAnswer,
  checkAnswer,
  infoBox,
}) => {
  return (
    <div className="quizbox section">
      <Box variant="scoreBoard" text={infoBox} />

      <article className="quizbox message">
        <div className="message-header">
          <p
            className="quizbox__text"
            dangerouslySetInnerHTML={{
              __html: section,
            }}
          />
        </div>
        <div className="message-body">
          <p
            className="quizbox__text"
            dangerouslySetInnerHTML={{
              __html: question,
            }}
          />
        </div>
      </article>
      <div className="quizbox__answers">
        {options.map((answer, index) => (
          <Button
            key={index}
            variant={`buttonAnswer`}
            text={answer}
            isDisabled={userAnswer ? true : false}
            value={answer}
            handleClick={checkAnswer}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={
              userAnswer ? userAnswer.selectedAnswer === answer : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};

export default QuizBox;
