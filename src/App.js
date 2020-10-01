import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./styles/App.scss";
import Home from "./pages/home";
import Footer from "./layout/Footer";
import Type from "./pages/type";
import List from "./pages/list";
import Quiz from "./pages/quiz";
import Select from "./pages/select";
import Icon from "./elements/Icon";
// import Header from "./layout/Header";
// import Logo from "./components/Logo";

function App(props) {
	console.log(props);
	// const { location, children } = props;
	// const quizPath = `/quiz`;
	// // const blogPath = `/blog`
	// let header;

	// if (location.pathname === quizPath) {
	// 	header = <>{children}</>;
	// } else {
	// 	header = <Logo />;
	// }

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
							<Type />
						</Route>
						<Route path="/list" exact>
							<List />
						</Route>
						<Route path="/quiz" exact>
							<Quiz />
						</Route>
						<Route path="/select" exact>
							<Select />
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
