import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../elements/Button';
import Icon from '../elements/Icon';

type Props = {
  subjectsPerYear: string[];
  selectedYear: number;
  handleSelectedSubject: (e: any) => void;
  isLoading: boolean;
  isError: boolean;
};

const List: React.FC<Props> = ({
  subjectsPerYear,
  selectedYear,
  handleSelectedSubject,
  isLoading,
  isError,
}) => {
  const handleOnClick = (e: any) => {
    const subjectSelected = e.target.value;
    handleSelectedSubject(subjectSelected);
  };
  return (
    <>
      {isLoading && (
        <div className="section">
          <p className="title">Loading subjects for {selectedYear} ...</p>
        </div>
      )}

      {!isLoading && !isError && (
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
      )}

      {isError && (
        <div className="section">
          <p className="title">
            Something went wrong, Please check your internet connection...
          </p>
        </div>
      )}
    </>
  );
};

export default List;
