import React from "react";
import "./styles/App.scss";
import Home from "./pages/home";
import Footer from "./layout/Footer";
import NavBar from "./components/NavBar";
import Header from "./layout/Header";

function App() {
	return (
		<div className="App">
			<Header />
			<Home />
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
