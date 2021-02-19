import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../elements/Button';
import Icon from '../elements/Icon';

interface TypeProps {
  handleQuestionType: (e: any) => void;
  quizType: any;
}

const Type: React.FC<TypeProps> = ({ handleQuestionType, quizType }) => {
  const typeList = quizType[0].list;
  const handleOnClick = (e: any) => {
    const questionType = e.target.value;
    handleQuestionType(questionType);
  };
  return (
    <div className="section">
      <h2 className="title">Select Question Type</h2>
      <div className="buttons">
        {typeList.map((data: any, index: any) => (
          <Link to="/select" key={index}>
            <Button
              type="buttonTitle"
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
