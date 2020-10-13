import React from 'react';
import Button from '../elements/Button';

type Props = {
  /** question number to be answered in the quiz box*/
  questionAnswered: string | number;
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
};

const QuizBox: React.FC<Props> = ({
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
