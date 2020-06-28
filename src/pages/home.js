import React from "react";
import Box from "../elements/Box";
import Button from "../elements/Button";
import NavBar from "../components/NavBar";
import Footer from "../layout/Footer";

function Home() {
	return (
		<div className="home">
			We Learn Everyday
			<Box text="Past questions" />
			<Button text="learn" type="is-primary" />
			<Footer>
				<NavBar>
					<span className="icon">
						<i className="fas fa-home"></i>
					</span>
				</NavBar>
			</Footer>
		</div>
	);
}

export default Home;
