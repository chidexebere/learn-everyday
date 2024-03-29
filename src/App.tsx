import React, { useState } from 'react';
import { Route, Switch, Link, useLocation } from 'react-router-dom';
import './styles/App.scss';
import Home from './pages/home';
import Footer from './layout/Footer';
import Type from './pages/type';
import List from './pages/list';
import Quiz from './pages/quiz';
import Select from './pages/select';
import Icon from './elements/Icon';
import { fetchSubjectsPerYear } from './api/fetchData';
import { SubjectsAndQues } from './utils/types';
import QuizContextProvider from './store/contexts/quizContext';

const App = (): JSX.Element => {
  const location = useLocation();

  const typePath = `/type`;
  const selectPath = `/select`;
  const listPath = `/list`;
  let footer;

  if (location.pathname === typePath) {
    footer = (
      <Footer>
        <Link to="/">
          <Icon variant="iconButton" fontType="fa fa-arrow-left" />
        </Link>
        <Link to="/">
          <Icon variant="iconButton" fontType="fa fa-home" />
        </Link>
      </Footer>
    );
  } else if (location.pathname === selectPath) {
    footer = (
      <Footer>
        <Link to="/type">
          <Icon variant="iconButton" fontType="fa fa-arrow-left" />
        </Link>
        <Link to="/">
          <Icon variant="iconButton" fontType="fa fa-home" />
        </Link>
      </Footer>
    );
  } else if (location.pathname === listPath) {
    footer = (
      <Footer>
        <Link to="/select">
          <Icon variant="iconButton" fontType="fa fa-arrow-left" />
        </Link>
        <Link to="/">
          <Icon variant="iconButton" fontType="fa fa-home" />
        </Link>
      </Footer>
    );
  } else {
    footer = <Footer />;
  }

  const [subjectsPerYear, setSubjectsPerYear] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [quizType, setQuizType] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubjectsPerYear = async (year: number) => {
    let subjectsAndQues;
    let subjects;
    setIsError(false);
    setLoading(true);
    try {
      subjectsAndQues = (await fetchSubjectsPerYear(year)).data;
      subjects = subjectsAndQues.map((item: SubjectsAndQues) => item.subject);
      setSubjectsPerYear(subjects);
    } catch (error) {
      setIsError(true);
    }
    setLoading(false);
  };

  const handleSelectedYear = (year: number) => {
    setSelectedYear(year);
  };

  const handleSelectedSubject = (subject: string) => {
    setSelectedSubject(subject);
  };

  const handleQuestionType = (type: string) => {
    setQuestionType(type);
  };

  const handleQuizType = (quizType: string) => {
    setQuizType(quizType);
  };

  return (
    <div className="App">
      <div className="main">
        <Switch>
          <Route path="/" exact>
            <Home handleQuizType={handleQuizType} />
          </Route>
          <Route path="/type" exact>
            <Type handleQuestionType={handleQuestionType} quizType={quizType} />
          </Route>
          <Route path="/list" exact>
            <List
              subjectsPerYear={subjectsPerYear}
              handleSelectedSubject={handleSelectedSubject}
              selectedYear={selectedYear}
              isLoading={loading}
              isError={isError}
            />
          </Route>
          <Route path="/quiz" exact>
            <QuizContextProvider>
              <Quiz
                selectedYear={selectedYear}
                questionType={questionType}
                selectedSubject={selectedSubject}
              />
            </QuizContextProvider>
          </Route>
          <Route path="/select" exact>
            <Select
              handleSubjectsPerYear={handleSubjectsPerYear}
              handleSelectedYear={handleSelectedYear}
            />
          </Route>
        </Switch>
      </div>
      <>{footer}</>
    </div>
  );
};

export default App;
