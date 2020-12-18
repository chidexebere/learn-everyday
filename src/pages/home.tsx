import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../elements/Button';
import Icon from '../elements/Icon';
import Header from '../layout/Header';
import Logo from '../components/Logo';
import appData from '../api/data.json';

const Home: React.FC = () => {
  // console.log(props);
  return (
    <>
      <Header type="default">
        <Link to="/">
          <Logo />
        </Link>
      </Header>

      <h2 className="home__title">Select Quiz</h2>
      <div className="buttons">
        {appData.map((data, index) => (
          <Link to="/type" key={index}>
            <Button text={data.title} type="buttonTitle">
              <Icon fontType="fa fa-chevron-right" />
            </Button>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
