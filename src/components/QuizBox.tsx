import React from 'react';
import Box from '../elements/Box';
import Button from '../elements/Button';

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
  userAnswer: any;
  /** callback function passed to the onClick handler*/
  checkAnswer: (e: any) => void;
  info: any;
}

const QuizBox: React.FC<QuizBoxProps> = ({
  section,
  question,
  options,
  userAnswer,
  checkAnswer,
  info,
}) => {
  return (
    <div className="quizbox section">
      <Box type="scoreBoard" text={info} />

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
            type={`buttonAnswer`}
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
