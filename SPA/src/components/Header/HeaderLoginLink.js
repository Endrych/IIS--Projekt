import React from "react";
import { Row, Col, NavLink } from "reactstrap";

const HeaderLoginLink = () => {
	return (
		<Row>
			<div className="header__top-part">
				<Col xs="12" sm="6">
					<div>Přihlásit</div>
					<div>Registrovat</div>
				</Col>
				<Col xs="12" sm="6">
					<input type="text" placeholder="Hledej" />
				</Col>
			</div>
		</Row>
	);
};

export default HeaderLoginLink;
