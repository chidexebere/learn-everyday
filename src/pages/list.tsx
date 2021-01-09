import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../elements/Button';
import Icon from '../elements/Icon';

type Props = {
  subjectsPerYear: string[];
  handleSelectedSubject: (e: any) => void;
};

const List: React.FC<Props> = ({ subjectsPerYear, handleSelectedSubject }) => {
  const handleOnClick = (e: any) => {
    const subjectSelected = e.target.value;
    handleSelectedSubject(subjectSelected);
  };
  return (
    <div className="section">
      <h2 className="title">Select Subject</h2>
      <div className="buttons">
        {subjectsPerYear.map((subject, index) => (
          <Link to="/quiz" key={index}>
            <Button
              text={subject}
              type="buttonTitle"
              handleClick={handleOnClick}
              value={subject}
            >
              <Icon fontType="fa fa-chevron-right" />
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default List;
