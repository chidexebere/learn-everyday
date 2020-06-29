import React from "react";
import "./styles/App.scss";
// import Home from "./pages/home";
import Footer from "./layout/Footer";
import NavBar from "./components/NavBar";
import Header from "./layout/Header";
import Type from "./pages/type";

function App() {
	return (
		<div className="App">
			<Header />
			<Type />
			<Footer>
				<NavBar>
					<span className="icon">
						<i className="fa fa-home"></i>
					</span>
					<span className="icon">
						<i className="fa fa-arrow-left"></i>
					</span>
				</NavBar>
			</Footer>
		</div>
	);
}

export default App;
