import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import "./styles/App.scss";
import Home from "./pages/home";
import Footer from "./layout/Footer";
// import NavBar from "./components/NavBar";
import Header from "./layout/Header";
import Type from "./pages/type";
import List from "./pages/list";
import Quiz from "./pages/quiz";
import Select from "./pages/select";
import ProgressBar from "./elements/ProgressBar";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Header>
					<ProgressBar type="is-success" />
				</Header>
				<div className="main">
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/type" exact component={Type} />
						<Route path="/list" exact component={List} />
						<Route path="/quiz" exact component={Quiz} />
						<Route path="/select" exact component={Select} />
					</Switch>
				</div>

				<Footer>
					<span className="icon">
						<i className="fa fa-home"></i>
					</span>
					<span className="icon">
						<i className="fa fa-arrow-left"></i>
					</span>
				</Footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
