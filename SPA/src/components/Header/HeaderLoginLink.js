import React from "react";
import { Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";
import "../../styles/Header/headerLoginLink.css";

const HeaderLoginLink = () => {
	return (
		<Row className="header__top-2">
			{/* <div > */}
			<Col className="header__links" xs="12" sm="6">
				<NavLink className="header__links--text" to="/login">
					Přihlásit
				</NavLink>
				<NavLink className="header__links--text" to="/register">Registrovat</NavLink>
			</Col>
			<Col xs="12" sm="6" className="header__wrapper--find">
				<input className="header__find" type="text" placeholder="Hledej" />
			</Col>
			{/* </div> */}
		</Row>
	);
};

export default HeaderLoginLink;
