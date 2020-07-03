import React from "react";

const Select = () => {
	return (
		<div className="selectYear">
			<div className="container">
				<div className="control">
					<div className="select is-large">
						<select className="is-focused">
							<option>Select year</option>
							<option>With options</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Select;
