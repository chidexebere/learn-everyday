import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './styles/App.scss';
import Home from './pages/home';
import Footer from './layout/Footer';
import Type from './pages/type';
import List from './pages/list';
import Quiz from './pages/quiz';
import Select from './pages/select';
import Icon from './elements/Icon';
import { fetchSubjectsPerYear } from './api/fetchData';
// import Header from "./layout/Header";
// import Logo from "./components/Logo";

function App() {
  // console.log(props);
  // const { location, children } = props;
  // const quizPath = `/quiz`;
  // // const blogPath = `/blog`
  // let header;

  // if (location.pathname === quizPath) {
  // 	header = <>{children}</>;
  // } else {
  // 	header = <Logo />;
  // }

  const [subjectsPerYear, setSubjectsPerYear] = useState([]);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [questionType, setQuestionType] = useState('');

  const handleSubjectsPerYear = async (year: number) => {
    const subjectsAndQues = (await fetchSubjectsPerYear(year)).data;
    const subjects = subjectsAndQues.map((item: any) => item.subject);
    setSubjectsPerYear(subjects);
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

  return (
    <BrowserRouter>
      <div className="App">
        {/* <Header type="default">{header}</Header> */}
        <div className="main">
          <Switch>
            {/* <Route path="/" exact component={Home} /> */}
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/type" exact>
              <Type handleQuestionType={handleQuestionType} />
            </Route>
            <Route path="/list" exact>
              <List
                subjectsPerYear={subjectsPerYear}
                handleSelectedSubject={handleSelectedSubject}
              />
            </Route>
            <Route path="/quiz" exact>
              <Quiz
                selectedYear={selectedYear}
                questionType={questionType}
                selectedSubject={selectedSubject}
              />
            </Route>
            <Route path="/select" exact>
              <Select
                handleSubjectsPerYear={handleSubjectsPerYear}
                handleSelectedYear={handleSelectedYear}
              />
            </Route>
          </Switch>
        </div>

        <Footer>
          <Link to="/">
            <Icon type="iconButton" fontType="fa fa-home" />
          </Link>
          <Icon type="iconButton" fontType="fa fa-arrow-right" />
          <Icon type="iconButton" fontType="fa fa-arrow-left" />
        </Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
