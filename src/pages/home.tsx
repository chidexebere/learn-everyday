import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../elements/Button';
import Icon from '../elements/Icon';
import Header from '../layout/Header';
import Logo from '../components/Logo';
import appData from '../api/data.json';

interface HomeProps {
  handleQuizType: (e: any) => void;
}

const Home: React.FC<HomeProps> = ({ handleQuizType }) => {
  const handleOnClick = (e: any) => {
    const quizType = e.target.value;
    const eachQuiz = appData.filter((item) => item.title === quizType);
    handleQuizType(eachQuiz);
  };

  return (
    <>
      <Header type="default">
        <Link to="/">
          <Logo />
        </Link>
      </Header>

      <div className="section">
        <h2 className="title">Select Quiz</h2>
        <div className="buttons">
          {appData.map((data, index) => (
            <Link to="/type" key={index}>
              <Button
                text={data.title}
                type="buttonTitle"
                isDisabled={data.disabled}
                handleClick={handleOnClick}
                value={data.title}
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
    </>
  );
};

export default Home;
