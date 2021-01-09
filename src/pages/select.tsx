import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../elements/Button';
import {
  getQuestionYears,
  questionYearEnd,
  questionYearStart,
} from '../utils/helpers';

type Props = {
  handleSubjectsPerYear: (e: any) => void;
  handleSelectedYear: (e: any) => void;
};

const Select: React.FC<Props> = ({
  handleSubjectsPerYear,
  handleSelectedYear,
}) => {
  const history = useHistory();
  const handleOnClick = (e: any) => {
    const yearSelected = parseInt(e.target.value);
    handleSelectedYear(yearSelected);
    handleSubjectsPerYear(yearSelected);
    history.push(`/list`);
  };

  return (
    <div className="section">
      <h2 className="title">Select Exam Year</h2>
      <div className="selectYear">
        {getQuestionYears(questionYearStart, questionYearEnd).map(
          (year, index) => (
            <Button
              key={index}
              text={year}
              handleClick={handleOnClick}
              value={year}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default Select;
