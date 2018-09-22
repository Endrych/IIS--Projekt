import React from "react";
import { NavLink } from "react-router-dom";
import { Row, Col } from "reactstrap";

const HeaderNavigationBar = () => {
	return (
		<Row style={{ backgroundColor: "pink" }}>
			<Col xs="12" sm="12" lg="4">
				<div className="header__nav-link--visible">
					<NavLink to="/news">Novinky</NavLink>
				</div>
			</Col>
			<Col xs="12" sm="12"  lg="4">
				<div className="header__nav-link--visible">
					<NavLink to="/games">Hry</NavLink>
				</div>
			</Col>
			<Col  xs="12" sm="12"  lg="4">
				<div className="header__nav-link--visible">
					<NavLink to="/tournaments">Turnaje</NavLink>
				</div>
			</Col>
		</Row>
	);
};

export default HeaderNavigationBar;
