import React from "react";
import Button from "../elements/Button";
import Icon from "../elements/Icon";

const List = () => {
	return (
		<div className="list">
			<h2 className="home__title">Select Question</h2>
			<div className="buttons">
				<Button type="buttonTitle" text="Math">
					<Icon fontType="fa fa-chevron-right" />
				</Button>
				<Button type="buttonTitle" text="English">
					<Icon fontType="fa fa-chevron-right" />
				</Button>
				<Button type="buttonTitle" text="Biology">
					<Icon fontType="fa fa-chevron-right" />
				</Button>
				<Button type="buttonTitle" text="Math">
					<Icon fontType="fa fa-chevron-right" />
				</Button>
				<Button type="buttonTitle" text="English">
					<Icon fontType="fa fa-chevron-right" />
				</Button>
				<Button type="buttonTitle" text="Biology">
					<Icon fontType="fa fa-chevron-right" />
				</Button>
			</div>
		</div>
	);
};

export default List;
