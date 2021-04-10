import React, { FC, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../elements/Button';
import {
  getQuestionYears,
  questionYearEnd,
  questionYearStart,
} from '../utils/helpers';

interface SelectProps {
  handleSubjectsPerYear: (year: number) => void;
  handleSelectedYear: (year: number) => void;
}

const Select: FC<SelectProps> = ({
  handleSubjectsPerYear,
  handleSelectedYear,
}) => {
  const history = useHistory();
  const handleOnClick = (e: MouseEvent) => {
    const { value } = e.target as HTMLButtonElement;
    const yearSelected = parseInt(value);
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
