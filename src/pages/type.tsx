import React, { FC, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import Button from '../elements/Button';
import Icon from '../elements/Icon';
import appData from '../api/data.json';

interface TypeProps {
  handleQuestionType: (type: string) => void;
  quizType: string;
}

const Type: FC<TypeProps> = ({ handleQuestionType, quizType }) => {
  const eachQuiz = appData.filter((item) => item.title === quizType);
  const typeList = eachQuiz[0].list;
  const handleOnClick = (e: MouseEvent) => {
    const { value } = e.target as HTMLButtonElement;
    handleQuestionType(value);
  };
  return (
    <div className="section">
      <h2 className="title">Select Question Type</h2>
      <div className="buttons">
        {typeList.map((data, index) => (
          <Link to="/select" key={index}>
            <Button
              variant="buttonTitle"
              text={data.questionType}
              isDisabled={data.disabled}
              handleClick={handleOnClick}
              value={data.questionType}
            >
              {data.disabled === false ? (
                <Icon fontType="fa fa-chevron-right" />
              ) : (
                <span className="tag is-medium is-warning">Coming Soon!</span>
              )}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Type;
