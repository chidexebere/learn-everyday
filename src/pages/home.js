import React from "react";
import { Link } from "react-router-dom";

import Button from "../elements/Button";
import Icon from "../elements/Icon";
import Header from "../layout/Header";
import Logo from "../components/Logo";

const Home = (props) => {
	console.log(props);
	return (
		<div className="home">
			<Header type="default">
				<Logo />
			</Header>

			<h2 className="home__title">Select Quiz</h2>
			<div className="buttons">
				<Link to="/list">
					<Button text="Past Questions" type="buttonTitle">
						<Icon fontType="fa fa-chevron-right" />
					</Button>
				</Link>
				<Button text="World History" type="buttonTitle">
					<Icon fontType="fa fa-chevron-right" />
				</Button>
				<Button text="Nigerian History" type="buttonTitle">
					<Icon fontType="fa fa-chevron-right" />
				</Button>
			</div>
		</div>
	);
};

export default Home;
