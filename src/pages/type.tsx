import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../elements/Button';
import Icon from '../elements/Icon';
import appData from '../api/data.json';

type Props = {
  handleQuestionType: (e: any) => void;
};

const Type: React.FC<Props> = ({ handleQuestionType }) => {
  const questionType = appData[0].list;
  const handleOnClick = (e: any) => {
    const questionType = e.target.value;
    handleQuestionType(questionType);
  };
  return (
    <div className="home">
      <h2 className="home__title">Select Quiz Type</h2>
      {questionType.map((data, index) => (
        <Link to="/select" key={index}>
          <Button
            type="buttonTitle"
            text={data}
            handleClick={handleOnClick}
            value={data}
          >
            <Icon fontType="fa fa-chevron-right" />
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default Type;
