import React from "react";
import Button from "../elements/Button";
import Icon from "../elements/Icon";

const Home = () => {
	return (
		<div className="home">
			<h2 className="home__title">Select Quiz</h2>
			<div className="buttons">
				<Button text="Past Questions" type="buttonTitle">
					<Icon fontType="fa fa-chevron-right" />
				</Button>
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
