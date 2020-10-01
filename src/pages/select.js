import React from "react";
import { useHistory } from "react-router-dom";

const Select = () => {
	const history = useHistory();

	const handleChange = (value) => {
		// history.push(`/?year=${value}`);
		history.push(`/${value}`);
	};

	return (
		<div className="selectYear">
			<div className="container">
				<div className="control">
					<div className="select is-large">
						<select
							className="is-focused"
							onChange={(event) => handleChange(event.target.value)}
						>
							<option>Select year</option>
							<option value="list">2010</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Select;
